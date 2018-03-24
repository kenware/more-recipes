import React, { Component } from 'react'
import './detail.scss';
import Header from '../App/common/header';
import { Link } from 'react-router-dom';
//import { Link } from 'react-router';
//import token from '../auth.js';
//import  up from 'react-icons/lib/fa/level-down';
//import nave from '../app/nav';
import { PropTypes } from 'react';
import  * as actions from '../../redux/Action/action.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Popover from 'react-simple-popover';
import { Markup } from 'interweave';
import trim from '../trim';
import ReactCardFlip from 'react-card-flip';
import FacebookProvider, { Comments,Share } from 'react-facebook';
//@wrapReactLifecycleMethodsWithTryCatch 
class Detail extends Component {
  constructor(props){
    super(props);
    this.state = {
      upvote:'upvote',
      downvote:'downvote',
      reviewButton:'review',
      cssupvote:"btn btn-info",
      cssdownvote:"btn btn-info",
      message:"",
      messages:"",
      inform:false,
      reviewError:"inform",
      reviewSuccess:"inform",
      open:false,
      user:'',
      voteError:"inform"

    }
    this.onChange = this.onChange.bind(this);
    this.onReview = this.onReview.bind(this);
  
  }

componentWillMount() {
  if(this.props.recipe.title==' '){
  this.props.actions.loadRecipes('id','DESC',0,6,'none');
}
 this.props.actions.getAllReviews(this.props.match.params.recipeId);
 this.props.actions.users();
 
  }
  componentDidMount(){
    var navpos = $("#navbar").offset().top;
    $(window).scroll(function(){
      //echo("here");
      var windpos = $(window).scrollTop();
      if (windpos>navpos){
        $("#navbar").addClass("fixed-top");
      }else{
        $("#navbar").removeClass("fixed-top");
      }
    })
  }

  componentWillReceiveProps(newProps){
    
   
    if(newProps.message.voteError && this.state.inform){
      this.setState({upvote:'upvote',downvote:'downvote',voteError:""})
     
     }else if(newProps.message.success && this.state.inform){
      this.setState({reviewSuccess:"",reviewButton:'review'})
      
     }else if(newProps.message.error && this.state.inform){
      this.setState({reviewError:"",reviewButton:'review'})
      }else if(newProps && this.state.inform){
        this.setState({upvote:'upvote',downvote:'downvote'})
      }
      if(newProps.recipe){
        if(newProps.recipe.title==' '){
          const user = {username:'',image:''}
          this.setState({user})
        }else{
        const id = newProps.recipe.UserId
        const user = newProps.user.find(recipe=>recipe.id==id)
        this.setState({user})
        }
    }
  }
  
  onChange(e){
    const state = this.state;
    state[e.target.name] = e.target.value;
   this.setState(state);

  }



onReview(e) {
   e.preventDefault();
   this.setState({
     reviewButton:(<div><i className="fa fa-spinner fa-spin fa-2x fa-fw" aria-hidden="true"></i>sending...</div>),
     inform:true})
   const id = this.props.match.params.recipeId;
   const message = this.state.message;
   
   const title = this.props.recipe.title;
   if(message.length<2){
    this.setState({reviewError:"",reviewButton:'review',messages: 'message cannot be empty'})
    return
   }
   this.props.actions.sendReview(id,title,message)
}

handleClick(e) {
  this.setState({open: !this.state.open});
}

handleClose(e) {
  this.setState({open: false});
}

render() {
const getVote = (vote) => {
  if(vote == "upvote"){
    const cssupvote = "btn btn-warning";
    this.setState({cssupvote,upvote:(<div><i className="fa fa-spinner fa-spin fa-2x fa-fw" aria-hidden="true"></i>downvoting...</div>)})
  }else{
    const cssdownvote = "btn btn-warning";
    this.setState({cssdownvote,
      downvote:(<div><i className="fa fa-spinner fa-spin fa-2x fa-fw" aria-hidden="true"></i>downvoting...</div>)})
  } 
    this.setState({inform:true})
     this.props.actions.getVotes(this.props.match.params.recipeId,vote)
    
  }
  const  handleClick=(e)=>{
    const state = this.state
   state[e]=true
   this.setState({state})
  }
   const  handleClose=(e)=>{
    const state = this.state
   state[e]=false
   this.setState({state})
     //this.setState({ isFlipped: !this.state.isFlipped });
     
    }
let recipe =this.props.recipe
let monthNames = [
  "January", "February", "March",
  "April", "May", "June",
  "July", "August", "September",
  "October", "November", "December"
];
let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    return (
  <div className="detail">
    <div className="row bg-dark" id="top-back">
      <div className="col-3">
       {this.state.url}
      </div>
      <div className="col-7 tex-center"> 
        <img src={recipe.image} alt="New York" className="rounded-circle" id="App-logo" className="rounded-circle" style={{height:"17rem",width:"17rem"}} />
      </div>
      <div className="col-2">
      </div>
    </div>
  
      <Header.nav />
 
    <div className="container">
    <div className="row text-center text-lg-left">
    </div>
    <div className="row">
    <h3 className="text-center col-12">Most Loved Recipes</h3>

    

     { this.props.mostLoved.map(recipe =>
      <div key={recipe.id} className="col-6 col-sm-4 col-lg-2 p-3" style={{background:''}}>
        <div>
       <Link to={`/recipes/${recipe.id}`}>
       
      <div className="text-center" style={{height:'13rem'}}>
      
       <img src={recipe.image}  className="img-thumbnail img-fluid h-100 w-100"/>
       <div className="mbr-overlay"
       style={{opacity:'0.25'}}>
         </div >
      <div className="carousel-caption">
        <p className="text-white display-5 py-2"> 
        {recipe.title}
          </p>
          <div className="row text-center text-white">
         <div className="col-12">
         <i className="fa fa-star text-warning" aria-hidden="true"></i>
        
         <i className="fa fa-star text-warning" aria-hidden="true"></i>
        
         <i className="fa fa-star text-warning" aria-hidden="true"></i>
        
         <Link to={`/recipes/${recipe.id}`}><i className="fa fa-heart text-warning p-3 display-5"></i>
         </Link>
         </div>
         <div className="col-12">
         <button className="btn btn-outline-success btn-sm text-white bg-info">
         <i className="fa fa-thumbs-up text-white" aria-hidden="true"></i>&nbsp;
         {recipe.upvote}
         </button>
         <button className="btn btn-outline-success btn-sm text-white">
         <i className="fa fa-thumbs-down text-white" aria-hidden="true"></i>&nbsp;
         {recipe.downvote}
         </button>
         </div>
         </div>
        </div>
      </div>
      </Link>
      </div>
      </div>
     )}
     
     </div>

      <div className="row">
        <div className="col-md-8">
        <br/>
          <div className="card mb-4">
            <div className="card-body">
            <div className="text-center card-img"><img className="img-fluid " src={recipe.image}
                alt="Recipe Image"/></div>
             <h2 className="card-title text-center text-secondary">{recipe.title}  </h2>
              <p className="card-text text-justify">
               <Markup content={recipe.content}
                tagName="span" />
               <h5>Ingredients</h5>
               {recipe.ingredients}
              </p>            
            </div>
            <div className="card-footer text-muted">
              Posted on  { trim.trim4(days[new Date(recipe.createdAt).getDay()])},&nbsp;{ trim.trim4(monthNames[new Date(recipe.createdAt).getMonth()])},
               &nbsp;{ new Date(recipe.createdAt).getDate()}&nbsp;
               { new Date(recipe.createdAt).getFullYear()}&nbsp; 
               at &nbsp; {new Date(recipe.createdAt).getHours() > 12 ? 
                (new Date(recipe.createdAt).getHours())-12 + ':' + new Date(recipe.createdAt).getMinutes() +' PM' : new Date(recipe.createdAt).getHours() + ':' + new Date(recipe.createdAt).getMinutes() +' AM'}
         
               <br/><img src={this.state.user.image}
               className="rounded-circle" height="50px" width="50px"/>
              <h4 className="text-primary">{ this.state.user.username}</h4>
              <button type="button" className={this.state.cssupvote} id="up"
              onClick={ () => { getVote("upvote") } }>{this.state.upvote}&nbsp;<i className="fa fa-thumbs-up" aria-hidden="true">&nbsp;{recipe.upvote}</i></button>&nbsp;
 
              <button type="button" className={this.state.cssdownvote} type="button" id="down"
              onClick={ () => { getVote("downvote") } }>{this.state.downvote}&nbsp;<i className="fa fa-thumbs-down" aria-hidden="true"></i>&nbsp;{recipe.downvote}</button>&nbsp;
           
          
            </div>
               <div className="alert alert-warning alert-dismissible" role="alert" id={this.state.voteError}>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <strong>
                   <span>
                    <font color='red'> 
                     {this.props.message.voteError }!
                    </font>
                   </span>
                  </strong>
               </div>
         </div>

        </div>
        <div className="rightbar col-xs-4 col-sm-4 ">
        <br/><br/>
        <div className="dropdown card-title-btn-container ">
          <h3 className="card-title">Links</h3>
          <button className="btn btn-sm btn-subtle dropdown-toggle float-right" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><em className="fa fa-cog"></em></button>
          <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton"><a className="dropdown-item" href="#"><em className="fa fa-search mr-1"></em> More info</a>
            <a className="dropdown-item" href="#"><em className="fa fa-thumb-tack mr-1"></em> Pin Window</a>
            <a className="dropdown-item" href="#"><em className="fa fa-remove mr-1"></em> Close Window</a></div>
        </div>
        <h6 className="card-subtitle mb-2 text-muted">Important Links</h6>
        <ul className="timeline">
          <li>
            <div className="timeline-badge"><em className="fa fa-camera"></em></div>
            <div className="timeline-panel bg-light">
              <div className="timeline-heading">
                <h5 className="timeline-title mt-2">Frofile</h5>
              </div>
              <div className="timeline-body">
              <ul>
              <li><Link to="/profile">My profile</Link></li>
              <li><h6><Link to="/profile">Change profile photo</Link></h6></li>
              <li><h6><Link to="/profile">Edit profile</Link></h6></li>
              <li><h6><Link to="/profile">Change Password</Link></h6></li>
             </ul>
              </div>
            </div>
          </li>
          <li>
            <div className="timeline-badge primary"><em className="fa fa-link"></em></div>
            <div className="timeline-panel bg-light">
              <div className="timeline-heading">
                <h5 className="timeline-title mt-2">My Recipes</h5>
              </div>
              <div className="timeline-body">
               <p>
                <ul>
                <li><Link to="/dashbord/add-recipe">Add new Recipe</Link></li>
                <li><Link to="/dashbord/favorite">All recipes</Link></li>
                <li><Link to="/dashbord/favorite">My favorite recipes</Link></li>
                <li><Link to="/dashbord/add-recipe">Add new favorite recipe</Link></li>
                <li><Link to="/dashbord/my-recipe">add favorite recipe from my recipes</Link></li>
               </ul>
              </p>
              </div>
             </div>
           </li>           
           <li>
             <div className="timeline-badge"><em className="fa fa-paperclip"></em></div>
             <div className="timeline-panel bg-light">
               <div className="timeline-heading">
                 <h5 className="timeline-title mt-2">Vote</h5>
               </div>
               <div className="timeline-body">
                 <p>
                 <ul>
                <li><Link to="/dashbord/add-recipe">Most upvoted recipes</Link></li>
                <li>Recently reviewed</li>
                <li><Link to="/dashbord/favorite">Top reviewed recipes</Link></li>
                <li>top upvoted reviews</li>
               </ul>
                 </p>
               </div>
             </div>
           </li>              
         </ul>
       </div>
      </div>
      <div className="row">
      
      <div className="col-md-8">
          <div className="card my-4" >
            <h5 className="card-header text-center">Provide reviews</h5>
            <div className="card-body" style={{background: 'aliceblue'}}>
              <form onSubmit={this.onReview}>      
                <fieldset className="form-group">
                 <label for="message">Message</label>
                 <textarea className="form-control" id="message" name="message" rows="10" onChange ={this.onChange}> </textarea>
                 </fieldset>          
                 <button type="submit"  className="btn btn-default" style={{background:'lightseagreen', color:'white'}}>{this.state.reviewButton}</button>
                 
              </form>
              <div class="alert alert-warning alert-dismissible" role="alert" id={this.state.reviewError}>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <strong>
                    <span><font color='red'> 
                    {this.props.message.error? <span> {this.props.message.error} ! 
                       <Link to="/login"> here </Link></span>:
                       <span>{this.state.messages}</span>
                       }
                     </font>
                     </span>
                  </strong>
              </div>
              <div className="alert alert-warning alert-dismissible" role="alert" id={this.state.reviewSuccess}>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <strong>
                    <span><font color='green'> {this.props.message.success} !</font></span>
                    
                  </strong>
              </div>
            </div>
          </div>
         
      <h1 className="my-4 text-center" >{this.props.reviews.length}&nbsp;{this.props.reviews.length>1 ?'Reviews':'Review'}</h1>
{ this.props.reviews.map(review =>
  <div>
  <div className="media">
  <img className="g-width-50 g-height-50 rounded-circle bg-white" src={review.user.image} alt="Image Description"/>
      
      <div className="media-body bg-white p-3">
      <h5 className="mt-0 text-info">  {review.reviewedBy}</h5>
      <h6 className="mt-0 text-muted"> Reviewed on&nbsp;
      { trim.trim4(days[new Date(review.createdAt).getDay()])},&nbsp;{ trim.trim4(monthNames[new Date(recipe.createdAt).getMonth()])}
        &nbsp;{ new Date(review.createdAt).getDate()}&nbsp;
        { new Date(review.createdAt).getFullYear()}&nbsp; 
        at &nbsp; {new Date(recipe.createdAt).getHours() > 12 ? 
        (new Date(review.createdAt).getHours())-12 + ':' + new Date(review.createdAt).getMinutes() +' PM' : new Date(recipe.createdAt).getHours() + ':' + new Date(recipe.createdAt).getMinutes() +' AM'}
      </h6>
    <p> { review.reviews}</p>  
      
        <ul className="list-inline d-sm-flex my-0">
         &nbsp;&nbsp;
          <li className="list-inline-item g-mr-20">
            <a className="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover" href="#!">
              <i className="fa fa-thumbs-up g-pos-rel g-top-1 g-mr-3"></i>
              178
            </a>
          </li>
          <li className="list-inline-item g-mr-20">
            <a className="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover" href="#!">
              <i className="fa fa-thumbs-down g-pos-rel g-top-1 g-mr-3"></i>
              34
            </a>
          </li>
          &nbsp;&nbsp;
          <li className="list-inline-item g-mr-20">
            <a className="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover" href="https://www.facebook.com">
              <i className="fa fa-facebook g-pos-rel g-top-1 g-mr-3"></i>
            </a>
          </li>
          <li className="list-inline-item g-mr-20">
            <a className="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover" href="https://www.twitter.com">
              <i className="fa fa-twitter g-pos-rel g-top-1 g-mr-3"></i>
              
            </a>
          </li>
          <li className="list-inline-item g-mr-20">
            <a className="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover" href="https://www.linkedin.com">
              <i className="fa fa-linkedin g-pos-rel g-top-1 g-mr-3"></i>
              
            </a>
          </li>
          <li className="list-inline-item ml-auto">
            <a className="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover" href="#!">
              <i className="fa fa-reply g-pos-rel g-top-1 g-mr-3"></i>
              Reply
            </a>
          </li>
         
        </ul>
        <br/>
      </div>    
  </div>
  <br/><br/>
</div>
 )}






  
        </div>
        <div className="col-4"></div>
    </div>
    <div class="container">
     <div className="row">
     { this.props.mostLoved.map(recipe =>
     <div className="col-12 col-sm-4 col-xl-2 p-3" key={recipe.id}>
       <div  style={{height:"20rem"}} className=" bg-info carousel slide">
     <ReactCardFlip isFlipped={this.state[recipe.id]}>
        <div key="front" className="carousel-inner"  
        onMouseEnter={()=>handleClick(recipe.id)}
        style={{height:"20rem"}}>
        
         <div className="mbr-overlay"
        style={{opacity: '0.2'}}>
         </div >
      
         <img src={recipe.image} className="h-100 w-100"/>
       <div className="carousel-caption">
        <p className="text-white display-4 py-2"> 
        {recipe.title}
          </p>
        </div>
         
        </div>
      
        <div key="back" onMouseLeave={()=>handleClose(recipe.id)}
        className="bg-info carousel-inner"
        style={{height:"20rem"}}>
        <h4 className="display-6 text-center text-white">{recipe.title}</h4>
        
        <p className="justify text-white p-3">
        <Markup content={ trim.trim3(`${recipe.content}`)} />
          </p>
        </div>
      </ReactCardFlip>
       </div>
     </div>
     )}
    </div>
    
   </div> 
     </div> 
     <Header.footer />
    </div>
    );
  }
}



function mapStateToProps(state, ownProps) { 
  let allReviews = state.reviews
  for(let user of state.users){
    for(let x=0; x<allReviews.length;x++){
      if(user.username==allReviews[x].reviewedBy){
        allReviews[x]["user"]=user
      }
    }
  } 
  if(state.recipes.length>0){
   const upvoted = state.recipes.sort((a,b)=>b.upvote-a.upvote);
  const recipes = upvoted.slice(0,6);
  const recipe = state.recipes.find(recipe=>recipe.id==ownProps.match.params.recipeId)
  //const userId = recipe.UserId
  //const user = state.users.filter(user=>user.id==userId)[0]
  
     return{
       mostLoved:recipes,
       recipe:recipe,
       message:state.message,
       reviews:allReviews,
       user:state.users
     } 
    }else{
      let recipes={id:28,title:' ',image:' ', ingredients:'jj',content:"kk"}
      let recip=[{id:28,title:' ',image:' ', ingredients:'jj',content:"kk"}]
      //const user =user(state.users,state.recipes)
     
      return{
        mostLoved:recip,
        recipe:recipes,
        message:state.message,
        reviews:allReviews,
        user:state.users
      } 
    }
}
function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}
export default connect(mapStateToProps, mapDispatchToProps)(Detail);