import React, { Component } from 'react'
//import './detail.scss';
import Header from '../App/common/header';
import { Link } from 'react-router-dom';
//import token from '../auth.js';
//import  up from 'react-icons/lib/fa/level-down';
//import nave from '../app/nav';
import { PropTypes } from 'react';
import  * as actions from '../../redux/Action/action.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import wrapReactLifecycleMethodsWithTryCatch from 'react-component-errors';

//@wrapReactLifecycleMethodsWithTryCatch 
class Detail extends Component {

componentWillMount() {
 this.props.actions.loadRecipe(this.props.match.params.recipeId);
  }

  

render() {
 const onChange=(e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
   this.setState(state);

  }



const sendReview = (e)=>{
   e.preventDefault();
   const message = this.state.message;
   fetch('/api/recipes/' + this.props.match.params.recipeId + '/reviews', 
      {
        method:'POST',
        headers:{'authorization':token(),'Content-Type':'application/json'},
        body:JSON.stringify({title:'review',reviews:message})
      })
      .then(res => res.json())
      .then(reviews => {
        const reviewmessage = 'review submitted';
        this.setState({ reviewmessage })}
        );

}


   



const getVote = (vote) => {
    
     this.props.actions.getVotes(this.props.match.params.recipeId,vote)
  }




    return (
      <div className="detail">
      <Header.nav />
         <div className="container">
            <h2 className="my-4" align="center"> <font color="red"> this.state.recipe.message 
            </font></h2>
           <div className="row">
          <div className="col-md-9">

          <h2 className="my-4" align="center">Details of a recipe
          </h2>
          <div className="card mb-4">
           
            <div className="card-body">
        <h2 className="card-title"> this.props.recipes.title  </h2>
        
              <p className="card-text text-justify">
               content
               {this.props.recipe.title}
           </p>            
          </div>
      <div className="card-footer text-muted">
              Posted on Sept 23, 2017 by
              <h4>@kelvin<up /></h4>
        
          <button class="btn btn-secondary warning" id="up"
             onClick={ () => { getVote("upvote") } }>upvote</button>
          <input className="btn btn-secondary" type="button"
             style={{background:'white',color:'black'}} value={this.props.recipe.upvote} id="upvote"/>
          <button className="btn btn-secondary" type="button" id="down"
             onClick={ () => { getVote("downvote") } }>downvote</button>
          <input className="btn btn-secondary" type="button" style={{background:'white',color:'black'}}
           value={this.props.recipe.downvote} id="downvote"/>
        
           
      </div>
          </div>

        </div>
    <div className="col-md-3">
          <div className="card my-4">
            <h5 className="card-header">Popular Links</h5>
            <div className="card-body">
              <div className="row">      
                  <ul className="list-unstyled mb-0">
                    <li>
                      <a href="#">Salad recipes</a>
                    </li>
                    <li>
                      <a href="#">Rice recipes</a>
                    </li>
                    <li>
                      <a href="#">All recipes</a>
                    </li>
                     <li>
                      <a href="#">Ogbono recipes</a>
                    </li>
                  </ul>               
              </div>
            </div>
          </div>
          <div className="card my-4">
            <h5 className="card-header">Links</h5>
            <div className="card-body">
              <div className="row">      
                  <ul className="list-unstyled mb-0">
                    <li>
                      <Link to={'/'}>Home</Link>
                    </li>
                    <li>
                      <a href="home.html">Logout</a>
                    </li>
                    <li>
                      <a href="profile.html">Profile</a>
                    </li>
                    <li>
                      <a href="dashbored.html">Add or modify</a>
                    </li>
                    <li>
                      <a href="dashbored.html">Delete recipes</a>
                    </li>
                  </ul>               
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
                 <form >      
                <fieldset className="form-group">
                 <label for="message">Message</label>
                 <textarea className="form-control" id="message" name="message" rows="10" onChange ={this.onChange}> </textarea>
                 </fieldset>          
                 <button type="submit"  class="btn btn-default" style={{background:'lightseagreen', color:'white'}}>Review</button>
              </form>
              <span><font color='green'> this.state.reviewmessage </font></span>
              <span><font color='red'> this.state.recipe.message  </font></span>
            </div>
          </div>
      <h1 className="my-4" align="center">1 Review</h1>
      <div className="card my-4">           
            <div className="card-body">
              <p className="card-text text-justify">Salad rice is very delicious and sumptous.I love
        Salad rice and i can eat it for days.The recipes of salad rice include
        rice, meat, vegetables, onions, pepper, okro,tomatoes,groundnut oil,vegetable oil
        Preparation of salad involvesw the frying of tomatoes first with groundnut oil and 
        adding various ingredient such as pepper, okro.
        </p>
            </div>
      <div className="card-footer text-muted">
              Reviewed on Sept 24, 2017 by
              <a href="#">@kelvin</a>
      </div>
          </div>
        </div>
    </div>
     </div> 
    </div>
    );
  }
}
function getRecipe(recipes, id){
  let recipe = recipes.find(recipe=>recipe.id == id)
  Object.assign({},recipe);
  return recipe;
}
function mapStateToProps(state, ownProps) { 
  //let idi = ownProps.params.recipeId 
  if (state.recipes) {
     return{
       recipe:state.recipes
     } 
   
  } else {
    return {
      recipes: {id: '', title: 'ken', breed: ''}
    }
  }

}
function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}
export default connect(mapStateToProps, mapDispatchToProps)(Detail);