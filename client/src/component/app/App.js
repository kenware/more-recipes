import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import nave from './nav';
import trim from './trim';
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom';



class App extends Component {
state = { recipe:[ ] }
componentDidMount() {
    fetch('/api/recipes')
      .then(res => res.json())
      .then(recipe => this.setState({ recipe }));
  }

  render() {
    return (
      <div className="App">
      <div class="row" id="top-back" id="bg">
           <div class="col-1">
           </div>
           <div class="col-10">  
             <img src="image/v.jpg" class="img-fluid rounded-circle" id="img"/>
             </div>
           <div class="col-1">
           </div>
          </div>
          <nave.nav />
        <div class="container">
          <div class="row" id="bh">
           <div class="col-sm-12 col-md-4">
            <div class="card my-4">
            <h5 class="card-header">Search recipes</h5>
            <div class="card-body">
              <div class="input-group">
                <input type="text" class="form-control" placeholder="enter keyword"/>
                <span class="input-group-btn">
                  <button class="btn btn-secondary" type="button">Search</button>
                </span>
              </div>
            </div>
           </div>
          </div>
          <div class="col-sm-12 col-md-4">
          <div class="card my-4">
        
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
                  
                </ul>               
            </div>
          </div>
        </div>
        </div>
        <div class="col-sm-12 col-md-4">
          <div class="card my-4">
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
                  
                </ul>               
            </div>
          </div>
        </div>
        </div>
          </div>
          <div class="row" id="bg">
          <div class="col-sm-12">
          <h2 class="my-4 text-center" align="center">
           <font color="black"> All Available Recipes</font>
          </h2>
          </div>
          </div>
          <div class="row">
          <div class="col-md-12 col-lg-1" id="bg">

             </div>
            <div class="col-md-12 col-lg-10">
            
             <div class="row">
              {this.state.recipe.map(recipe =>
               <div key={recipe.id}  class="col-sm-12 col-md-6 col-lg-4">
                <div class="card border-secondary mb-2" >
                 <div class="card-header">
                 <h3 class="card-title"><font color="lightseagreen">{ recipe.title }</font></h3>
                 </div>
                  <div class="card-body">
                   <img class="card-img-top rounded-circle" src="image/a.jpg"
                    alt="Recipe Image"/>
                   <p class="card-text">{ trim(recipe.content) }</p>
                   <button class="btn btn-primary" style={{color: 'white'}}><Link to={`/detail/${recipe.id}`} style={{color: 'white'}}>Read More &rarr;</Link></button>
                  </div>
                </div>
              </div> 
              )}
             </div>
            </div>
            <div class="col-md-12 col-lg-1" id="bg">

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
