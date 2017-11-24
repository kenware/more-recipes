import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
const footer = () =>{
       return (
      <footer class="py-5 bg-dark">
      <div class="container">
        <p class="m-0 text-center text-white">Copyright &copy; More-recipes 2017</p>
      </div>
      </footer>
      );
}

const nav = () =>{
   
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
               
            </li>
            <li class="nav-item active">
             <Link class="nav-link">Home
                <span class="sr-only">(current)</span>
              </Link>
            </li>
             
             <li class="nav-item">
              <Link class="nav-link">SignUp</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link">Login </Link>
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
    );
  }
   


export default {
  footer,
  nav
};