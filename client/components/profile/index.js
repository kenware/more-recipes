import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom';
import { PropTypes } from 'react';
import  * as actions from '../../redux/Action/action.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './index.scss'
import trim from '../trim';
import { Markup } from 'interweave';
import Header from '../App/common/header';
import Update from './update';

class Profile extends Component {
    constructor(props){
        super(props)
this.state = { 
  file:[],
  }
}

componentWillMount() {
  this.props.actions.auth();
  } 

 
render() {
 
    return (
<div>
<Header.nav3 />
<div className="container-fluid">

   <div className="row">
      
      <nav className="profileSidebar navbar-dark bg-profile col-sm-3 col-md-3">
         <div >
          <h3 className="site-title"><Link to="/recipes"><em className="fa fa-home"></em>More-recipes</Link></h3>
          <ul className="profile-nav">
            <li className="nav-item"><Link className="nav-link active" to="/dashbord"><em className="fa fa-dashboard"></em> Dashboard <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item"> 
              <Link to="/profile" className="nav-link" ><i className="fa fa-calendar-o"></i> Profile</Link>     
            </li>
            <li className="nav-item"> 
              <Link to="/profile" className="nav-link" ><i className="fa fa-calendar-o"></i> Update Profile</Link>             
            </li>
            <li className="nav-item"> 
              <Link to="/profile" className="nav-link" ><i className="fa fa-calendar-o"></i> Change Password</Link>             
            </li>

            <li className="nav-item"><Link to="/dashbord/favorite" className="nav-link" ><em className="fa fa-bar-chart"></em> Favorite Recipe</Link></li>
        
            <li className="nav-item"> <a className="nav-link text-primary" type="btn"><em className="fa fa-power-off"></em> Signout</a></li>
          </ul>
         
         </div>
        </nav>
        <main className="col-sm-12 col-md-9 offset-sm-3">
        <Route exact path="/profile" component={ Update }/> 
        </main>
    </div>      
</div>
</div>
    );
  }
}

function mapStateToProps(state, ownProps) {   
   
        return {
          recipes: state.recipes,
          message:state.message
        };
     
    
  }
  function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(actions, dispatch)}
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Profile);