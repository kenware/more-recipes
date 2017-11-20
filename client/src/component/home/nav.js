import React, { Component } from 'react';
import logo from '../app/logo.svg';
//import './App.css';



 const nav=() =>{
   
    return (
     
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
              <a class="nav-link" href="index.html">Home
                <span class="sr-only">(current)</span>
              </a>
            </li>
             
            <li class="nav-item">
              <a class="nav-link" href="signup.html">SignUp</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="login.html">Login </a>
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
       );
  }
   

const footer =  () => {
       return(
      <div class="container">
        <p class="m-0 text-center text-white">Copyright &copy; More-recipes 2017</p>
      </div>
      );
}
export default { nav,
                footer };