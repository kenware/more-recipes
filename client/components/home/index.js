
//import { connect } from 'react-redux';
//import default from '../../../server/middleware/auth';
//import { getAllTasks, postNewTask } from '../redux/reducer';
//import Task from './Task';

//import 'bootstrap/dist/css/bootstrap-theme.css';
import { PropTypes } from 'react';
import { Link  } from 'react-router-dom';
import  * as actions from '../../redux/Action/action.js';
import React, { Component } from 'react'
import './index.scss';
import Header from '../App/common/header';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//import './Navsticky.js';

class Home extends Component {
  componentWillMount() {
    if (this.props.recipes[0].id == '') {
      this.props.actions.loadRecipes();
    }
  }
  componentDidMount(){

  }
  
  render() {
    const recipes = this.props.recipes
    return (
      
      <div>
        <div>
        </div>
       <div className="row" id="top-back" id="bg">
       <div className="col-3">
       </div>
       <div className="col-6">  
         <img src="image/ac.jpg" className="img-fluid rounded-circle" id="img"/>
         </div>
       <div className="col-3">
       </div>
      </div>
      <Header.nav />
    <div className="container">
      <div className="row" id="bh">
       <div className="col-sm-12 col-md-4">
        <div className="card my-4">
        <h5 className="card-header">Search recipes</h5>
        <div className="card-body">
          <div className="input-group">
            <input type="text" class="form-control" placeholder="enter keyword"/>
            <span className="input-group-btn">
              <button className="btn btn-secondary" type="button">Search</button>
            </span>
          </div>
        </div>
       </div>
      </div>
      <div className="col-sm-12 col-md-4">
      <div className="card my-4">
    
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
              
            </ul>               
        </div>
      </div>
    </div>
    </div>
    <div className="col-sm-12 col-md-4">
      <div className="card my-4">
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
              
            </ul>               
        </div>
      </div>
    </div>
    </div>
      </div>
      <div className="row" id="bg">
      <div className="col-sm-12">
      <h2 className="my-4 text-center" align="center">
       <font color="black"> All Available Recipes</font>
      </h2>
      </div>
      </div>
      <div className="row">
      <div className="col-md-12 col-lg-1" id="bg">

         </div>
        <div className="col-md-12 col-lg-10">
        
         <div className="row">
          { recipes.map(recipe =>
           <div key={recipe.id}  class="col-sm-12 col-md-6 col-lg-4">
            <div className="card border-secondary mb-2" >
             <div className="card-header">
             <h3 className="card-title"><font color="lightseagreen">{ recipe.title }</font></h3>
             </div>
              <div className="card-body">
               <img className="card-img-top rounded-circle" src="image/ac.jpg"
                alt="Recipe Image"/>
               <p className="card-text"></p>
               <Link to={`/recipes/${recipe.id}`} style={{color: 'white'}}><button className="btn btn-primary" style={{color: 'white'}}>Read More &rarr;</button></Link>
              </div>
            </div>
          </div> 
          )}
         </div>
        </div>
        <div className="col-md-12 col-lg-1" id="bg">

        </div>
      </div>
    </div>
      
       <Header.footer />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {  
  if (state.recipes.length > 0) {
    return {
      recipes: state.recipes
    };
  } else {
    return {
      recipes: [{id: '', title: 'ken', breed: '', temperament: '', weight: '', hobbies: []}]
    }
  }

}
function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);