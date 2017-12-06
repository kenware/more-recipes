import React, {PropTypes} from 'react';
import { Link } from 'react-router-dom';
//import { Link } from 'react-router';
//import '../../../css/bootstrap.min.css';

const footer = () =>{
  return (
 <footer className="py-5 bg-dark">
 <div className="container">
   <p className="m-0 text-center text-white">Copyright &copy; More-recipes 2017</p>
 </div>
 </footer>
 );
}

const nav=() =>{

return (
<nav className="navbar navbar-expand-lg navbar-dark bg-dark" id="navbar">
 <div className="container">
   <a className="navbar-brand" href="#">More-recipe</a>
   <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
     <span className="navbar-toggler-icon"></span>
   </button>
   <div className="collapse navbar-collapse" id="navbarResponsive">
     <ul className="navbar-nav ml-auto">
       <li className="nav-item">
       </li>
       <li className="nav-item active">
        <Link to={ '/'} className="nav-link">Home
           <span className="sr-only">(current)</span>
         </Link>
       </li>
        
        <li className="nav-item">
         <Link to={ '/register'} className="nav-link">SignUp</Link>
       </li>
       <li className="nav-item">
         <Link to={ '/login'} className="nav-link">Login </Link>
       </li>
       <li className="nav-item">
         <a className="nav-link" href="profile.html">profile</a>
       </li>
 <li className="nav-item">
         <a className="nav-link" href="dashbored.html">Dashbored</a>
       </li>
 <li className="nav-item">
         <a className="nav-link" href="favorite.html">Favorites</a>
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