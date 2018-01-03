import React, {PropTypes} from 'react';
import { Link } from 'react-router-dom';
import history from '../../../history';
import './header.scss';
//import { Link } from 'react-router';
//import '../../../css/bootstrap.min.css';
const signOut=() =>{
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("id");
  history.push('/recipes')
}
const footer = () =>{
  return (
    <div>
    <footer className="mt-5">
  <div className="container-fluid bg-faded mt-5">
    <div className="container">
      <div className="row py-3">
       
        <div className="col-md-4">
          
          <div className="row py-2">
            <div className="col-sm-3 hidden-md-down">
              <a className="bg-circle bg-info" href="https://twitter.com/ ">
                <i className="fa fa-2x fa-fw fa-twitter" aria-hidden="true "></i>
              </a>
            </div>
            <div className="col-sm-9">
              <h4>Tweets</h4>
              Embed here?
            </div>
          </div>
      
        </div>
       
        <div className="col-md-4">
          
          <div className="row py-2">
            <div className="col-sm-3 hidden-md-down">
              <a className="bg-circle bg-info" href="#">
                <i className="fa fa-2x fa-fw fa-address-card" aria-hidden="true "></i>
              </a>
            </div>
            <div className="col-sm-9">
              <h4>Contact us</h4>
              <p>+2348063543512</p>
            </div>
          </div>
         
          <div className="row py-2">
            <div className="col-sm-3 hidden-md-down">
              <a className="bg-circle bg-info" href="#">
                <i className="fa fa-2x fa-fw fa-laptop" aria-hidden="true "></i>
              </a>
            </div>
            <div className="col-sm-9">
              <h4>Cookie policy</h4>
              <p className=" ">We use <a className=" " href="/# ">cookies </a></p>
            </div>
          </div>
         
        </div>
       
        <div className="col-md-4">
          
          <div className="row py-2">
            <div className="col-sm-3 hidden-md-down">
              <a className="bg-circle bg-danger" href="# ">
                <i className="fa fa-2x fa-fw fa-file-pdf-o" aria-hidden="true "></i>
              </a>
            </div>
            <div className="col-sm-9">
              <h4>Download pdf</h4>
              <p> You like print?</p>

            </div>
          </div>
         
          <div className="row py-2">
            <div className="col-sm-3 hidden-md-down">
              <a className="bg-circle bg-info" href="https://twitter.com/ ">
                <i className="fa fa-2x fa-fw fa-info" aria-hidden="true "></i>
              </a>
            </div>
            <div className="col-sm-9">
              <h4>Info</h4>
              About us.
            </div>
          </div>
    
        </div>
 
      </div>
    </div>
  </div>


  <div className="container-fluid bg-dark py-3">
    <div className="container">
      <div className="row py-3">
        <div className="col-md-9">
          <p className="text-white">important link @Kenware</p>
          <p className="text-white"><Link to='/login'>Login</Link></p>
          <p className="text-white"><Link to='/signup'>SignUp</Link></p>
          <p className="text-white"><Link to='/dashbord'>Dashbord</Link></p>
          <p className="text-white"><Link to='/profile'>Profile</Link></p>
        </div>
        <div className="col-md-3">
          <div className="d-inline-block">
            <div className="bg-circle-outline d-inline-block">
              <a href="https://www.facebook.com/" className="text-white"><i className="fa fa-2x fa-fw fa-facebook"></i>
		</a>
            </div>

            <div className="bg-circle-outline d-inline-block">
              <a href="https://twitter.com/" className="text-white">
                <i className="fa fa-2x fa-fw fa-twitter"></i></a>
            </div>

            <div className="bg-circle-outline d-inline-block">
              <a href="https://www.linkedin.com/company/" className="text-white">
                <i className="fa fa-2x fa-fw fa-linkedin"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</footer>
</div>
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
         <Link to={ '/signup'} className="nav-link">SignUp</Link>
       </li>
       <li className="nav-item">
         <Link to={ '/login'} className="nav-link">Login </Link>
       </li>
       <li className="nav-item">
         <Link to="/profile" className="nav-link" >profile</Link>
       </li>
 <li className="nav-item">
         <Link to="/dashbord" className="nav-link">Dashbored</Link>
       </li>
 <li className="nav-item">
         <Link to="/dashbord/favorite" className="nav-link" >Favorites</Link>
       </li>
     </ul>
   </div>
 </div>
 </nav>
  );
}

const nav2=() =>{
  
  return (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
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
           <Link to={ '/signup'} className="nav-link">SignUp</Link>
         </li>
         <li className="nav-item">
           <Link to={ '/login'} className="nav-link">Login </Link>
         </li>
         <li className="nav-item">
         <Link to="/profile" className="nav-link" >profile</Link>
       </li>
        <li className="nav-item">
         <Link to="/dashbord" className="nav-link">Dashbored</Link>
       </li>
       <li className="nav-item">
         <Link to="/dashbord/favorite" className="nav-link" >Favorites</Link>
       </li>
       </ul>
     </div>
   </div>
   </nav>
    );
  }

  const nav3=() =>{
    
    return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
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
            
           <li className="nav-item dropdown">
           <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
             Dashbord
           </a>
           <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
             <Link to="/dashbord/add-recipe" className="dropdown-item">Add Recipe</Link>
             <Link to="/dashbord/all-recipe" className="dropdown-item">All Recipe</Link>
             <Link to="/dashbord/favorite" className="dropdown-item">Favorites Recipes</Link>
             <Link to="/dashbord/my-recipe" className="dropdown-item">My Recipes</Link>
           </div>
         </li>
           <li className="nav-item">
             <Link to="/profile" className="nav-link">profile</Link>
           </li>
     <li className="nav-item">
             <Link to="/dashbord/favorite" className="nav-link" >Favorites</Link>
           </li>
           <li className="nav-item">
             <button type="btn" onClick={()=> signOut()}className="btn bg-dark nav-link">signout</button>
           </li>
         </ul>
       </div>
     </div>
     </nav>
      );
    }



export default {
  footer,
  nav,
  nav2,
  nav3
};