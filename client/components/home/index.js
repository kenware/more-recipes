
//import 'bootstrap/dist/css/bootstrap-theme.css';
import { PropTypes } from 'react';
import { Link, Redirect } from 'react-router-dom';
//import { Link } from 'react-router';
import  * as actions from '../../redux/Action/action.js';
import React, { Component } from 'react'
import './index.scss';
import Header from '../App/common/header';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Markup } from 'interweave';
import trim from '../trim';
import ReactEasyPaginate from 'react-easy-paginate';
import 'react-easy-paginate/dist/react-easy-paginate.css';

import ReactCardFlip from 'react-card-flip';
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';
//SmoothScrollbar.use(OverscrollPlugin);
const limit = 6;
class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      data:this.props.recipes,
      url:<s/>,
      r:"",
      show:"",
      search:" ",
     
      
      }
      this.handlePaginateClick = this.handlePaginateClick.bind(this);
      this.onCancel = this.onCancel.bind(this)
      this.onChange = this.onChange.bind(this)
      this.search = this.search.bind(this)
     
  }

  componentWillMount() {
    this.props.actions.users();
    const pag = this.props.match.params.page;
    const defaultPage =1;
    if (pag) {
      this.props.actions.loadRecipes('id','DESC',pag,limit,'none');
    }else{
      this.props.actions.loadRecipes('id','DESC',defaultPage,limit,'none');
    }
    

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

 
handlePaginateClick(pageNum) {
  this.props.actions.loadPagination(pageNum,limit,this.props.allRecipes);
  //this.getData(offset, limit);
 this.setState({url: <Redirect to={`/recipes/page/`+pageNum}/>})
 console.log(this.props.recipes)
 
  //this.setState({url,})
}
onCancel(e){
  this.setState({show:"show"})
}
onChange(e){
  const state = this.state;
  state[e.target.name] = e.target.value;
 this.setState(state);

}
search(e){
  const keyword=this.state.search;
  //if(keyword!==" "){
  this.props.actions.loadRecipes('id','DESC',1,limit,keyword);
  //}
}

  render() {
    const recipes = this.props.paginate;
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
  
    let monthNames = [
      "January", "February", "March",
      "April", "May", "June",
      "July", "August", "September",
      "October", "November", "December"
    ];
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    

     

        return (
         
          <div>
       {this.state.url}
<div id="demo" className="carousel slide" data-ride="carousel">

  <ul className="carousel-indicators">
    <li data-target="#demo" data-slide-to="0" className="active"></li>
    <li data-target="#demo" data-slide-to="1"></li>
    <li data-target="#demo" data-slide-to="2"></li>
  </ul>
  <div className="carousel-inner">
    <div className="carousel-item one active">
    <div className="mbr-overlay">
                </div>
    
    
     
      <div className="carousel-caption justify">
       <div className="col-12">
        <h3 className="lead display-3">Get Your Favorite Recipe</h3>
        <p className="lead display-5">Get recipes that improve your health</p>
        </div>
      </div>   
    </div>
  <div className="carousel-item two" >
    <div className="mbr-overlay">
                </div>
    
    
    
      <div className="carousel-caption justify">
      <div className="col-12">
        <h3 className="lead display-3">Health is wealth</h3>
        <p className="lead display-5">This is amazing!</p>
        </div>
      </div>   
    </div>
    <div className="carousel-item three">
    <div className="mbr-overlay">
                </div>

     
    
      <div className="carousel-caption text-center justify">
      <div className="col-12">
        <h3 className="lead display-3">I love Peach</h3>
        <p className="lead display-5">We love the Big Apple!</p>
        </div>
      </div>   
    </div>
  </div>
  <a className="carousel-control carousel-control-prev"
   role="button" href="#demo" data-slide="prev">
    <span className="fa fa-arrow-circle-left fa-5x"></span>
  </a>
  <a className="carousel-control-next" href="#demo" data-slide="next">
    <span className="fa fa-arrow-circle-right fa-5x"></span>
  </a>
</div>
<div>

  <Header.nav /> 


</div>
    <div className="container bg-container">
     <div className="row">
      <h3 className="text-center col-12">Most Loved Recipes</h3>
     { this.props.recipes.map(recipe =>
      <div key={recipe.id} className="col-6 col-sm-4 col-lg-2 p-2 bg-light" style={{background:''}}>
      <div className="card rounded ">
      
      <div className="card-header card-img text-center">
  
      <Link to={`/recipes/${recipe.id}`}> <img src={recipe.image} id='upvoted-image' className="rounded-circle img-fluid"/>
      </Link>
     </div>
       
       <div className="card-body">
       <p className="justify display-5 text-center"><Markup content={ trim.trim2(`${recipe.title.toUpperCase()}`)} /></p>
         <div className="row text-center">
         <div className="col-12">
         <i className="fa fa-star text-info" aria-hidden="true"></i>
        
         <i className="fa fa-star text-info" aria-hidden="true"></i>
        
         <i className="fa fa-star text-info" aria-hidden="true"></i>
        
         <Link to={`/recipes/${recipe.id}`}><i className="fa fa-heart text-warning p-3 display-5"></i>
         </Link>
         </div>
         <div className="col-12">
         <button className="btn btn-outline-success btn-sm">
         <i className="fa fa-thumbs-up text-primary" aria-hidden="true"></i>&nbsp;
         {recipe.upvote}
         </button>
         <button className="btn btn-outline-success btn-sm">
         <i className="fa fa-thumbs-down text-primary" aria-hidden="true"></i>&nbsp;
         {recipe.downvote}
         </button>
         </div>
         </div>
       
       </div>
      </div>
      
      </div>
     )}
     
     </div>
     <div className="row">

  

</div>
      <div className="row" id="">
       <div className="col-sm-12 col-md-4">
        <div className="card my-4">
        <h6 className="card-header">Search recipes by title,contents or ingredients{this.state.r}</h6>
        <div className="card-body">
        <form>
          <div className="input-group">
           
            <input type="text" onChange={this.onChange} name="search" className="form-control" placeholder="enter keyword"/>
            <span className="input-group-btn">
              <button onClick={this.search} className="btn btn-secondary" type="button">Search</button>
            </span>
          
          </div>
          </form>
        </div>
       </div>
      </div>
      <div className="col-sm-12 col-md-4 text-center">
        <img src="image/l.png" id="App-logo" className="rounded-circle" style={{height:"9rem",width:"9rem"}} />
      </div>
      <div className="col-sm-12 col-md-4">
      <div className="card my-4">
    
      <div className="card-body">
        <div className="row"> 
          <div className="col-6">     
            <ul className="list-unstyled mb-0">
              
              <li>
              <Link to={'/signup'}>sign Up</Link>
              </li>
              <li>
              <Link to={'/login'}>login</Link>
              </li>
              <li>
                 <Link to={'/profile'}>profile</Link>
              </li>
              <li>
              <Link to={'/dashbord'}>dashbord</Link>
                
              </li>
              
            </ul> 
            </div>
            <div className="col-6">     
            <ul className="list-unstyled mb-0">
              <li>
                <Link to={'/dashbord/favorite'}>My Favorite</Link>
              </li>
              <li>
              <Link to={'/dashbord/add-recipe'}>Add Recipe</Link>
              </li>
              <li>
              <Link to={'/dashbord/my-recipe'}>My Recipes</Link>
              </li>
              <li>
                <Link to={'/dashbord/favorite'}>Top Recipes</Link>
              </li>
              
            </ul> 
            </div>                  
        </div>
      </div>
    </div>
    </div>
    
      </div>
      <div className="row bg" id="">
      <div className="col-sm-12">
      <h2 className="my-4 text-center" align="center">
        All Available Recipes
      </h2>
      <div className="content landing" id={this.state.show}>
        <div className="modal-header">
          <h4 className="modal-title text-danger">Info!</h4>
          <button type="button" onClick={ this.onCancel }  className="close" data-dismiss="modal">&times;</button>
        </div>
        <div className="modal-body text-danger text-center">
           More-recipes is designed to allow people across culture, country and world 
           to share their recipes.This means that you can prepare any recipe perculiar to
            any culture without travelling to that location.<br/>
           <img src={`upload/g.jpg`} className="rounded-circle img-default"/>
        </div>
        <div className="modal-footer">
          <button type="button" onClick={ this.onCancel } className="btn btn-info" data-dismiss="modal">Cancel</button>
        </div>

      </div>
      </div>
      </div>
      <div className="row">
        <br/>
          { recipes.map(recipe =>
           <div key={recipe.id}  id="bg-al" className="card p-4 col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 " >
             <div className="card-wrapper">
              <div className="card-header">
               <div className="row">
                <div className="col-2">
                 <img src={recipe.user.image} className="rounded-circle" height="50px" width="50px"/> 
                </div>
                <div className="col-10">
                 <font className="text-info">{recipe.user.username}
                 </font><br/><font className="text-muted">
                  { trim.trim4(monthNames[new Date(recipe.createdAt).getMonth()])}
                  &nbsp;{ new Date(recipe.createdAt).getDate()}, 
                  { new Date(recipe.createdAt).getFullYear() }  
                   &nbsp;at {new Date(recipe.createdAt).getHours() > 12 ? 
                  (new Date(recipe.createdAt).getHours())-12 + ':' + new Date(recipe.createdAt).getMinutes() +' PM' : new Date(recipe.createdAt).getHours() + ':' + new Date(recipe.createdAt).getMinutes() +' AM'}
                 </font>
               </div>
              </div>
              </div>
               <div className="ml-auto card-img" style={{height:"14rem"}}>
               
               <Link to={`/recipes/${recipe.id}`}>
               <img className="img-fluid rounded card-img-top h-100 w-100" src={recipe.image}
                alt="Recipe Image"/>
                 </Link>
               </div>
               <div className="card-header">
                <h4 className="lead card-title text-sucess" >
             <Link to={`/recipes/${recipe.id}`}>{ recipe.title }</Link></h4>
             </div>
             <div className="card-box justify">
                <p className="justify mbr-text mbr-fonts-style display-7">
                 <Markup content={ trim.trim(`${recipe.content}`)} />
                </p>
                 <i className="fa fa-star text-info" aria-hidden="true"></i>
                 <i className="fa fa-star text-info" aria-hidden="true"></i>
                 <i className="fa fa-star text-info" aria-hidden="true"></i>
                 <i className="fa fa-star text-info" aria-hidden="true"></i>
                 <button className="btn btn-outline-success btn-sm">
                 <i className="fa fa-thumbs-up text-primary" aria-hidden="true"></i>&nbsp;
                 {recipe.upvote}
                 </button>
              
               
              </div>
     

                </div>
          </div> 
          
          )}
             
         </div><br/>
         <div className="row">
    <div id="react-easy-paginate" className="col-12 text-center">
          <ReactEasyPaginate pageTotal={Math.floor(this.props.recipes.length / limit) + 1} rangeDisplayed={4} onClick={this.handlePaginateClick} />
        </div>
     </div>
         <div class="container-fluid">
         <div className="mbr-overla"
          style={{opacity: '0.2',backgroundColor: "rgb(35, 35, 35)",position: 'absolute',zIndex:10}}>
         </div>
        <div className="row parallax"
         style={{ paddingTop: '90px',paddingBottom: '90px'}}>
        
            <div className="col-12 col-sm-6 col-md-4 col-lg-4 para p-3">
                <div className="card-img text-center">
                    <span className="fa fa-dashboard display-4"></span>
                </div>
                <div className="card-box text-center text-white">
                    <h4 className="card-title display-7">
                        Dashboard
                    </h4>
                    <p className="justify display-7">
                       Go to your dashboard to add recipe, 
                       delete recipe and perform wonderful and
                       awsome functionalites.
                       You can prepare any 
                    recipe without stress or having to travel there.
                    </p>
                    <div className=" text-center rounded">
                        <Link to="/dashbord" href="" className="btn btn-warning btn-lg display-3 parallax-btn">
                            More
                        </Link>
                    </div>
                </div>
            </div>
            <div className=" col-12 col-sm-6 col-md-4 col-lg-4 para p-3">
                <div className="card-img text-center">
                    <span className="fa fa-dashboard display-4"></span>
                </div>
                <div className="card-box text-center text-white">
                    <h4 className="card-title display-7">
                        Add Recipes
                    </h4>
                    <p className="justify display-7">
                    Go to your dashboard to add recipe, 
                    delete recipe and perform wonderful and
                    awsome functionalites.You can prepare any 
                    recipe without stress or having to travel there.
                 </p>
                 <div className=" text-center rounded">
                     <Link to="/dashboard" href="" className="btn btn-warning btn-lg display-3 parallax-btn">
                         More
                     </Link>
                    </div>
                </div>
            </div>
            <div className=" col-12 col-sm-6 ml-auto col-md-4 col-lg-4 para p-3">
                <div className="card-img text-center">
                    <span className="fa fa-heart display-4"></span>
                </div>
                <div className="card-box text-center text-white">
                    <h4 className="card-title display-7">
                        Favorite Recipes
                    </h4>
                    <p className="justify display-7">
                    Go to your dashboard to add recipe, 
                    delete recipe and perform wonderful and
                    awsome functionalites.You can prepare any 
                    recipe without stress or having to travel there.
                 </p>
                 <div className=" text-center rounded">
                     <Link to="/dashbord/favorite" className="btn btn-warning btn-lg display-3 parallax-btn">
                         More
                     </Link>
                    </div>
                </div>
            </div>
            <div className="col-12 col-sm-3"></div>
          </div></div>
     <br/>
    <div class="container">
     <div className="row">
     { this.props.recipes.map(recipe =>
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
   <div class="container-fluid">
    <div className="row user-testimonial">
     <h2 className="col-12 text-center text-info"><br/><br/>WHAT OUR FANTASTIC USERS SAY</h2>
     <h4 className="col-12 text-center text-info">Best site to get latest recipe with just a click<br/><br/></h4>
     <div className="col-1"></div>
     <div className="user-panel col-10">
       <div className="card-block">
         <div className="testimonial-photo mx-auto d-block">
            <img src="image/eze.jpg"
            className="rounded-circle  h-100 w-100"/>
          </div>
          
          <p class="mbr-text mbr-fonts-style mbr-white display-7">
             More-recipes is amazing!. For the first time i can prepare an recipe 
             From any culture, raceor country without having to travel there.
             All i have to do is follow strickly the instructions and procedure
             as provided by the recipe.This is really awsome.
          </p>
          </div>
          <div className="text-center text-white">
            <div className=" display-5 ">
                  John Smith
            </div>
            <small className=" display-7 ">
                    Developer
            </small>
          </div>
        </div>
        <div className="col-1"></div>
        <div className="col-1"></div>
     <div className="user-panel col-10">
       <div className="card-block">
         <div className="testimonial-photo mx-auto d-block">
            <img src="image/face1.jpg"
            className="rounded-circle  h-100 w-100"/>
          </div>
          
          <p class="mbr-text mbr-fonts-style mbr-white display-7">
          More-recipes is awsome!. I was not a good cook for my husband but with
          more-recipes, i can now prepare a very delicous meal. 
          It really changed me and my family.
          All i have to do is follow strickly the instructions and procedure
          as provided by the recipe.This is really awsome.
          </p>
          </div>
          <div className="text-center text-white">
            <div className=" display-5 ">
                  John Smith
            </div>
            <small className=" display-7 ">
                    Developer
            </small>
          </div>
        </div>
        <div className="col-1"></div>
        
  
    </div>
   </div>
   <div class="container-fluid">
    <div className="row">
    <div className="col-6">
   



     </div>
     <div className="col-6">
     <figure class="mbr-figure align-center container">
        <div class="video-block" style={{width: '66%'}}>
            <div><iframe class="mbr-embedded-video" src="https://www.w3schools.com/html/mov_bbb.mp4#t=0.5" width="1280" height="720" frameborder="0" allowfullscreen></iframe></div>
        </div>
    </figure>
     </div>
    </div>
    </div> 
    <br/>
    </div> 
       <Header.footer />
    </div>   
     
    );
  }
}

function mapStateToProps(state, ownProps) {
  let urecipe = state.paginate
 for(let user of state.users){
   for(let x=0; x<urecipe.length;x++){
     if(user.id==urecipe[x].UserId){
      urecipe[x]["user"]=user
     }
   }
 } 
 const upvoted = state.recipes.sort((a,b)=>b.upvote-a.upvote);
 const recipes = upvoted.slice(0,6);
    return {
      allRecipes:state.recipes,
      recipes: recipes,
      paginate:urecipe
    };
  

}
function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);