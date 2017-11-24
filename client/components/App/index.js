import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom';

const footer = () =>{
       return (
      <footer class="py-5 bg-dark">
      <div class="container">
        <p class="m-0 text-center text-white">Copyright &copy; More-recipes 2017</p>
      </div>
      </footer>
      );
}

class Home extends Component {
    render() {
   
    return (
     <nav class="navbar navbar-expand-lg navbar-dark bg-dark" id="navbar">
      <div class="container">
        <a class="navbar-brand" href="#">More-recipe</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
               <img src={ logo } class="App-logo"/>
            </li>
            <li class="nav-item active">
             <Link to={ '/'} class="nav-link">Home
                <span class="sr-only">(current)</span>
              </Link>
            </li>
             
             <li class="nav-item">
              <Link to={ '/register'} class="nav-link">SignUp</Link>
            </li>
            <li class="nav-item">
              <Link to={ '/login'} class="nav-link">Login </Link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="profile.html">profile</a>
            </li>
      <li class="nav-item">
              <a class="nav-link" href="dashbored.html">Dashbored</a>
            </li>
      <li class="nav-item">
              <a class="nav-link" href="favorite.html">Favorites</a>
            </li>
          </ul>
        </div>
      </div>
      </nav>
      <div></div>
      <footer class="py-5 bg-dark">
      <div class="container">
        <p class="m-0 text-center text-white">Copyright &copy; More-recipes 2017</p>
      </div>
      </footer>
    );
  }
}
   


export default App;