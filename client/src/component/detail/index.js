import React, { Component } from 'react';
import './index.css'
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom';
import token from '../auth.js';
import  up from 'react-icons/lib/fa/level-down';
import nave from '../app/nav';
class detail extends Component {

  state = { 
    recipe:[ ], 
    vote:[ ],
    voterr:'',
    reviews:[ ], 
    message:'', 
    reviewmessage:''
  }
  

componentDidMount() {
  fetch('/api/recipes/'+this.props.match.params.recipeId )
      .then(res => res.json())
      .then(recipe => {
        if(typeof recipe == 'string'){
          this.setState({ voterr:recipe });
        }else{
        this.setState({ recipe });
        const vote = recipe;
        this.setState({ vote });
        }
        });
      
    
  }

  onChange = (e) =>{
    const state = this.state;
    state[e.target.name] = e.target.value;
   this.setState(state);

  }



sendReview = (e) => {
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


   




render() {
const getVote = (vote) => {
    
      fetch('/api/recipes/'+this.props.match.params.recipeId + '/' + vote, 
      {
        method:'PUT',
        headers:{'authorization':token()}
        
      })
      .then(res => res.json())
      .then(vote => this.setState({ vote }));
  }




    return (
      <div className="detail">
      <nave.nav />
         <div class="container">
            <h2 class="my-4" align="center"> <font color="red">{ this.state.recipe.message }
            </font></h2>
           <div class="row">
          <div class="col-md-9">

          <h2 class="my-4" align="center">Details of a recipe
          </h2>
          <div class="card mb-4">
            
            <div class="card-body">
        <h2 class="card-title">{ this.state.recipe.title }</h2>
        
              <p class="card-text text-justify">
               { this.state.recipe.content }
              
           </p>            
          </div>
            <div class="card-footer text-muted">
              Posted on Sept 23, 2017 by
              <h4>@kelvin<up /></h4>
        <span class="input-group-btn">
                  <button class="btn btn-secondary" type="button" id="up" onClick={ () => { getVote("upvote") } }>upvote<up /></button>
          <i class="icon-circle-arrow-down"></i>
          <input class="btn btn-secondary" type="button" style={{background:'white',color:'black'}} 
          value={ this.state.vote.upvote } id="upvote"/>
          <button class="btn btn-secondary" type="button" id="down" onClick={ () => { getVote("downvote") } }>downvote</button>
          <input class="btn btn-secondary" type="button" style={{background:'white',color:'black'}} value={ this.state.vote.downvote } id="downvote"/>
          <h5 class="my-4" align="center"> <font color="red">{ this.state.voterr }
            </font></h5>
                </span>
           
            </div>
          </div>

        </div>
    <div class="col-md-3">
          <div class="card my-4">
            <h5 class="card-header">Popular Links</h5>
            <div class="card-body">
              <div class="row">      
                  <ul class="list-unstyled mb-0">
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
          <div class="card my-4">
            <h5 class="card-header">Links</h5>
            <div class="card-body">
              <div class="row">      
                  <ul class="list-unstyled mb-0">
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
      <div class="row">
      <div class="col-md-9">
          <div class="card my-4" >
            <h5 class="card-header">Provide reviews</h5>
            <div class="card-body" style={{background: 'azure'}}>
                 <form onSubmit={ this.sendReview } >      
                <fieldset class="form-group">
                 <label for="message">Message</label>
                 <textarea class="form-control" id="message" name="message" rows="10" onChange ={this.onChange}> </textarea>
                 </fieldset>          
                 <button type="submit"  class="btn btn-default" style={{background:'lightseagreen', color:'white'}}>Review</button>
              </form>
              <span><font color='green'>{ this.state.reviewmessage } </font></span>
              <span><font color='red'>{ this.state.recipe.message } </font></span>
            </div>
          </div>
      <h1 class="my-4" align="center">1 Review</h1>
      <div class="card my-4">           
            <div class="card-body">
              <p class="card-text text-justify">Salad rice is very delicious and sumptous.I love
        Salad rice and i can eat it for days.The recipes of salad rice include
        rice, meat, vegetables, onions, pepper, okro,tomatoes,groundnut oil,vegetable oil
        Preparation of salad involvesw the frying of tomatoes first with groundnut oil and 
        adding various ingredient such as pepper, okro.
        </p>
            </div>
      <div class="card-footer text-muted">
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
export default detail;