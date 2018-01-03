import React, { Component } from 'react'
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
import history from '../../history';

//@wrapReactLifecycleMethodsWithTryCatch 
class Detail extends Component {
  constructor(props){
    super(props);
    this.state = {
      cssupvote:"btn btn-info",
      cssdownvote:"btn btn-info",
      message:"",
      voteAlert: "show",
      reviewAlert: "show",
      open:false,
      edit:"",
      user:'',
      users:'',
      reviews:null
   

    }
    this.onChange = this.onChange.bind(this);
    this.onReview = this.onReview.bind(this);
     
  }

componentWillMount() {

 this.props.actions.loadRecipe(this.props.match.params.recipeId);
 this.props.actions.getAllReviews(this.props.match.params.recipeId);
 this.props.actions.users();
 
  }
  componentDidMount(){
   
  }

  componentWillReceiveProps(newProps){
    if(newProps.message.reviews!=this.state.reviews){
      this.props.reviews.push(newProps.message.reviews);
      this.setState({reviews:newProps.message.reviews})
    }
    if(newProps.users){
      for (let user of newProps.users){
        if(user.id==this.props.recipe.UserId){
          this.setState({user:user})
        }
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
   const id = this.props.match.params.recipeId;
   const message = this.state.message;
   const title = this.props.recipe.title;
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
    this.setState({cssupvote})
  }else{
    const cssdownvote = "btn btn-warning";
    this.setState({cssdownvote})
  } 
     this.props.actions.getVotes(this.props.match.params.recipeId,vote)
  }

 const deleteRecipe=(id)=>{
    this.props.actions.deleteRecipe(id)
    }
 const editRecipe=(id)=>{
     const userId=localStorage.getItem("id");
     console.log(userId)
     if(userId==id){
       return history.push("/dashbord/edit/"+this.props.match.params.recipeId);
     }else{
       this.setState({edit:"you cannot edit recipe you did not add"})
     }
 }


    return (
      <div className="detail col-12" style={{background:"azure"}}>
           <div className="row">
          <div className="col-12">

          <h2 className="my-4" align="center">Details of a recipe
          </h2>
          <div className="card mb-4 bg-default">
           
            <div className="card-body">
        <h2 className="card-title">{this.props.recipe.title}  </h2>
        
              <p className="card-text text-justify">
               <h5>{this.state.check}content</h5>
               <Markup content={this.props.recipe.content}
                tagName="span" />
               <h5>Ingredients</h5>
               {this.props.recipe.ingredients}
           </p>            
          </div>
      <div className="card-footer text-muted">
              Posted on {this.props.recipe.createdAt} by
              <h4>{this.state.user.username}</h4>
     <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
       <div className="btn-group mr-2" role="group" aria-label="First group">
          <button type="button" className={this.state.cssupvote} id="up"
             onClick={ () => { getVote("upvote") } }>upvote&nbsp;<i className="fa fa-thumbs-up" aria-hidden="true">&nbsp;{this.props.recipe.upvote}</i></button>&nbsp;

          <button type="button" className={this.state.cssdownvote} type="button" id="down"
             onClick={ () => { getVote("downvote") } }>downvote&nbsp;<i className="fa fa-thumbs-down" aria-hidden="true"></i>&nbsp;{this.props.recipe.downvote}</button>&nbsp;
        
          <button type="button" onClick={ () => { editRecipe(`${this.props.recipe.UserId}`) } } className="btn btn-info" id="up"
           ><i className="fa fa-pencil" aria-hidden="true"></i>&nbsp;Edit</button>&nbsp;
         <button type="button"  className="btn btn-info" data-toggle="modal" data-target="#myModal"><i className="fa fa-trash-o" aria-hidden="true"></i>&nbsp;Delete</button>
         
       </div>
      </div>
      <div> <font color="red">  {this.state.edit}</font></div>
<div className="modal fade" id="myModal">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h4 className="modal-title text-danger">warning</h4>
        <button type="button" className="close" data-dismiss="modal">&times;</button>
      </div>
      <div className="modal-body text-danger">
        You are about to delete this recipe with title <Link to={`/dashbord/detail/${this.props.recipe.id}`}> {this.props.recipe.title}</Link><br/>
       <img src={`upload/${this.props.recipe.image}`} style={{width:"8rem",height:"8rem"}} className="rounded-circle"/>
      </div>
      <div className="modal-footer">
      <button className="delete btn btn-info" type="button" data-dismiss="modal"
      onClick={ () => { deleteRecipe(`${this.props.recipe.id}`) } }><i className="fa fa-trash-o" aria-hidden="true"></i>&nbsp;Delete</button>
        <button type="button" className="btn btn-info" data-dismiss="modal">Cancel</button>
      </div>

    </div>
  </div>
</div>
      <div className="alert alert-warning alert-dismissible" role="alert" id={`vote`+this.props.message.voteError}>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <strong>
                  <span><font color='red'> 
                  {this.props.message.voteError }!
                   </font>
                   </span>
                  </strong>
              </div>
        </div>
    </div>

        </div>
      </div>
      <div className="row">
      <div className="col-md-9">
          <div className="card my-4" >
            <h5 className="card-header">Provide reviews</h5>
            <div className="card-body" style={{background: 'azure'}}>
              <form onSubmit={this.onReview}>      
                <fieldset className="form-group">
                 <label for="message">Message</label>
                 <textarea className="form-control" id="message" name="message" rows="10" onChange ={this.onChange}> </textarea>
                 </fieldset>          
                 <button type="submit"  className="btn btn-default" style={{background:'lightseagreen', color:'white'}}>Review</button>
              </form>
              <div class="alert alert-warning alert-dismissible" role="alert" id={`vote`+this.props.message.error}>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <strong>
                    <span><font color='red'> 
                    {this.props.message.error }! <br/>Please
                       <Link to="/login"> Login </Link>
                    to be able to provide review
                     </font>
                     </span>
                  </strong>
              </div>
              <div class="alert alert-warning alert-dismissible" role="alert" id={`vote`+this.props.message.success}>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <strong>
                    <span><font color='green'> {this.props.message.success} !</font></span>
                    
                  </strong>
              </div>
            </div>
          </div>
      <h1 className="my-4" align="center">{this.props.reviews.length} Review</h1>
      { this.props.reviews.map(review =>
      <div className="card my-4">           
            <div className="card-body">
              <p className="card-text text-justify">
                    { review.reviews}
             </p>
            </div>
      <div className="card-footer text-muted">
              Reviewed on: {review.createdAt}<br/>
              By: {review.reviewedBy}
      </div>
          </div>
        )}
        </div>
    </div> 
    </div>
    );
  }
}

function mapStateToProps(state, ownProps) { 
  //let idi = ownProps.params.recipeId 
     return{
       recipe:state.recipes,
       message:state.message,
       reviews:state.reviews,
       users:state.users
     }
}
function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}
export default connect(mapStateToProps, mapDispatchToProps)(Detail);