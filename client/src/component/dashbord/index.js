import React, { Component } from 'react';
import token from '../auth.js';
import './index.css';
import nave from '../app/nav';

import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom';



class bord extends Component {
state = {
     recipe:[ ],
     navigate:''
 }
componentDidMount() {
    //const token = token();
    if(token()){
    fetch('/api/recipes')
      .then(res => res.json())
      .then(recipe =>{
          alert('session expired')
           this.setState({ recipe })
      });
      
   }else{
    this.setState({ navigate: true });
   }
  }

  render() {
    const { navigate } = this.state;
    // here is the important part
        if (navigate) {
          return <Redirect to="/login" push={true} />
        };
    return (
      <div className="bord">
          <nave.nav />
          <div class="container">
      
      <div class="row">
        <div class="col-sm-4">
          <div class="list-group">
            <a href="dashbored.html" class="list-group-item list-group-item-action active" id="dash">Dashbored</a>
            <a href="profile.html" class="list-group-item list-group-item-action">Profile</a>
            <a href="index.html" class="list-group-item list-group-item-action">Logout</a>
            <a href="favorite.html" class="list-group-item list-group-item-action">Favorite recipes</a>
			<a href="index.html" class="list-group-item list-group-item-action">All recipes</a>
            <a href="index.html" class="list-group-item list-group-item-action">Home</a>
			<a class="list-group-item list-group-item-action" id="adding">Add new recipe</a>
         </div>
        </div>

      
        <div class="col-sm-8">
         <ul class="nav nav-tabs">
	        <li class="nav-item">
              <a class="nav-link active" id="recipe">All My Recipes</a>
            </li>
			<li class="nav-item">
              <a class="nav-link" id="add">Add New Recipe</a>
            </li>
         </ul>
         <div class="add" style="display:none">
		   <div class="card my-4">
            <h5 class="card-header">Enter Recipe Details</h5>
            <div class="card-body">
              <form action="/review">
                <fieldset class="form-group">
                 <label for="last_name">Recipe Tittle</label>
                 <input type="text" class="form-control" id="tittle" name="tittle" placeholder="recipe name"/>
                </fieldset>		
                <fieldset class="form-group">
                 <label for="image">Photo of recipe(Optional)</label>
                 <input type="file" class="form-control" id="image" name="image"/>
                </fieldset>						
                <fieldset class="form-group">
                   <label for="message">Description</label>
			            <textarea class="form-control" id="description" name="description" rows="15"> </textarea>
                 </fieldset>          
                 <button type="submit" class="btn btn-default" style="background-color:lightseagreen; color:white;">Submit</button>
              </form>
            </div>
          </div>
         </div>		 
		 <div class="recipe">
		  <h3 class="my-4" style="color:lightseagreen;"align="center">
		     All my Recipes
          </h3>
          <div class="card mb-4">            
            <div class="card-body">
			  <h4 class="card-title">Salad Rice Recipe</h4>
              <p class="card-text">Salad rice is very delicious and sumptous....</p>
              <a href="detail.html" class="btn btn-primary">view &rarr;</a>
            </div>
            <div class="card-footer text-muted">
              Posted on Sept 24, 2017 by
              <a href="#">@keny</a>
			  <span class="input-group-btn">
			    <button class="btn btn-secondary" type="button" id="down">delete</button>
				<button class="btn btn-primary" type="button" id="down">Edit</button>
			  </span>
            </div>
          </div>
		   <div class="card mb-4">            
            <div class="card-body">
			  <h4 class="card-title">Okpa Recipe</h4>
              <p class="card-text">Okpa is very delicious<input type="button" class="u"/> and sumptous....</p>
              <a href="detail.html" class="btn btn-primary">view &rarr;</a>
            </div>
            <div class="card-footer text-muted">
              Posted on Sept 24, 2017 by
              <a href="#">@kevin</a>
			  <span class="input-group-btn">
			    <button class="btn btn-secondary" type="button" id="down">delete</button>
				<button class="btn btn-primary" type="button" id="down">Edit</button>
			  </span>
            </div>
          </div>
		  <div class="card mb-4">            
            <div class="card-body">
			  <h4 class="card-title">Akara Recipe</h4>
              <p class="card-text">Akara is very delicious and sumptous....</p>
              <a href="detail.html" class="btn btn-primary">view &rarr;</a>
            </div>
            <div class="card-footer text-muted">
              Posted on Sept 24, 2017 by
              <a href="#">@kevin</a>
			  <span class="input-group-btn">
			    <button class="btn btn-secondary" type="button" id="down">delete</button>
				<button class="btn btn-primary" type="button" id="down">Edit</button>
			  </span>
            </div>
          </div>
		 
          <ul class="pagination justify-content-center mb-4">
            <li class="page-item">
              <a class="page-link" href="#">&larr; Older</a>
            </li>
            <li class="page-item disabled">
              <a class="page-link" href="#">Newer &rarr;</a>
            </li>
          </ul>
		 </div> 
        </div>
      </div>

  </div>
  </div>
  
    );
  }
}

export default bord;
