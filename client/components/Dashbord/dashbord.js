import React, { Component } from 'react';
import './dashbord.scss'
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom';
import Header from '../App/common/header';
import { PropTypes } from 'react';
import  * as actions from '../../redux/Action/action.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RecipeForm from "./recipeForm";
import Home from "./home";
import Popover from 'react-simple-popover';
import Favorite from './favorite';
import TopReviews from './topUpvote';
import AllRecipe from './allRecipe';
import MyRecipes from './myRecipe';
import Detail from './detail';
import EditRecipe from './editRecipe';
import history from '../../history';

class Dashbord extends Component {
    constructor(props){
        super(props)
this.state = { 
  secondSideBar:"",
  firstSideBar :"firstSideBar",
  dashbord:false,
  add:false,
  favorite:false,
  all:false,
  myRecipe:false
  
  }
  this.onChang = this.onChang.bind(this);
  this.signOut = this.signOut.bind(this)
}
componentWillMount() {
  
   this.props.actions.auth();
   this.props.actions.user();
 
    }
 onChang(e){
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }
signOut(e){
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("id");
  history.push('/recipes')
}
  
render() {
const handleClose = (value) => {
  const state = this.state;
  state[value] = false;
  this.setState(state);
}
 const  handleClick = (value) => {
   if(value!=="favorite"){
    handleClose("favorite");
      
   }
    const state = this.state;
    state[value] = true;
    this.setState(state);
  }

 const toggleSideBar = (n) => {
   if(n=="secondSideBar"){
    this.setState({firstSideBar:""});
    this.setState({secondSideBar:"secondSideBar"})
   }else{
    this.setState({firstSideBar:"firstSideBar"});
    this.setState({secondSideBar:""})
   }
  }
  
    return (
      <div >
      <Header.nav3 />
      <div className="container-fluid">
       <div className="row">
        <nav className="sidebar navbar-dark bg-dark col-sm-1 icon-nav" id={this.state.firstSideBar}>
         <div>
          <button className="btn bg-dark" onClick={() => toggleSideBar("firstSideBar")}  id="menu-toggle"><em className="fa fa-bars bg-light"></em></button>
           <h1 className="site-title"><a href="index.html"><em className="fa fa-home"></em></a></h1>
           <ul className="nav sidebar-nav">
            <li className="nav-item">
            
              <Link to="/dashbord" 
                 className="nav-link active"
                 ref="targetd"
                 onMouseEnter={()=>handleClick("dashbord")}
                 onMouseLeave={()=>handleClose("dashbord")}
                 >
                 <em className="fa fa-dashboard"></em> <span className="sr-only">(current)</span>
                 <Popover
                placement='right'
                container={this}
                target={this.refs.targetd}
                show={this.state.dashbord}
                style={{color:"white",background:"#7376df"}}
                containerStyle={{background:"red", margin:"5 0 0 0"}}
                onHide={()=>handleClose("dashbord")} >
                <p>Dashboard</p>
                </Popover>
              </Link>
              
            </li>
            <li className="nav-item">
               <Link to="/dashbord/all-recipe"
                className="nav-link"
                ref="targeta"
                onMouseEnter={()=>handleClick("all")}
                onMouseLeave={()=>handleClose("all")}
                ><i className="fa fa-calendar-o"></i>
                <Popover
               
                placement='right'
                container={this}
                target={this.refs.targeta}
                show={this.state.all}
                style={{color:"white",background:"#7376df"}}
                containerStyle={{background:"red", margin:"3rem 0 0 0"}}
                onHide={()=>handleClose("all")} >
                <p>All Recipe</p>
                </Popover>
                </Link>
                
            </li>
            <li className="nav-item">
               <Link to="/dashbord/add-recipe"
                className="nav-link"
                ref="targetw"
                onMouseEnter={()=>handleClick("add")}
                onMouseLeave={()=>handleClose("add")}
                ><i className="fa fa-calendar-o"></i>
                <Popover
               
                placement='right'
                container={this}
                target={this.refs.targetw}
                show={this.state.add}
                style={{color:"white",background:"#7376df"}}
                containerStyle={{background:"red", margin:"4rem 0 0 0"}}
                onHide={()=>handleClose("add")} >
                <p>Add Recipe</p>
                </Popover>
                </Link>              
            </li>
            <li className="nav-item">
               <Link to="/dashbord/my-recipe"
                className="nav-link"
                ref="target"
                onMouseEnter={()=>handleClick("myRecipe")}
                onMouseLeave={()=>handleClose("myRecipe")}
                ><i className="fa fa-calendar-o"></i>
                <Popover
               
                placement='right'
                container={this}
                target={this.refs.target}
                show={this.state.myRecipe}
                style={{color:"white",background:"#7376df"}}
                containerStyle={{background:"red", margin:"-2rem 0 0 0"}}
                onHide={()=>handleClose("myRecipe")} >
                <p>My Recipe</p>
                </Popover>
                </Link>              
            </li>
            <li className="nav-item">
              <a className="nav-link"
                ref="target"
                onMouseEnter={()=>handleClick("favorite")}
              
                >
               <em className="fa fa-bar-chart text-primary"></em>
              </a>
               <Popover              
                placement='right'
                container={this}
                target={this.refs.target}
                show={this.state.favorite}
                style={{color:"white",background:"#7376df"}}
               
                onHide={()=>handleClose("favorite")} >
                <h6 className="header bg-warning">Add favorite Recipe</h6>
                <p><Link to="/dashbord/add-recipe" style={{ color: '#FFF' }}>
                Add New</Link></p>
                <h6><Link to="/dashbord/all-recipe" style={{ color: '#FFF' }}>
                  Add from existing recipe
                  </Link></h6>
                </Popover>
              
            </li>
            <li className="nav-item">
               <Link to="/profile"
                className="nav-link"
                ref="target"
                onMouseEnter={()=>handleClick("profile")}
                onMouseLeave={()=>handleClose("profile")}
                ><em className="fa fa-user-circle mr-1"></em>
                <Popover
               
                placement='right'
                container={this}
                target={this.refs.target}
                show={this.state.profile}
                style={{color:"white",background:"#7376df"}}
                containerStyle={{background:"red", margin:"4rem 0 0 0"}}
                onHide={()=>handleClose("profile")} >
                <p>my profile</p>
                </Popover>
                </Link>
            </li>
            <li className="nav-item"><Link to="/recipes" className="nav-link">
              <em className="fa fa-hand-o-up"></em></Link>
            </li>
            <li className="nav-item"> <button type="btn" onClick={this.signOut} className="btn bg-dark nav-link text-primary"><em className="fa fa-power-off"></em></button></li>
            </ul>
          
           <br/>
          <button className="btn bg-dark" onClick={() => toggleSideBar("firstSideBar")}>
            <h3 className="btn" id="first-sidebar" ><em className="fa fa-angle-double-right bg-light"></em></h3>
          </button>
         </div>
        </nav> 
        <nav id = {this.state.secondSideBar} className="sidebar navbar-dark bg-dark col-sm-3 word-nav">
         <div>
          <button className="btn bt-default bg-dark" onClick={() => toggleSideBar("secondSideBar")} id="menu-toggle">
           <em className="bg-light fa fa-bars"></em>
          </button>
          <h3 className="site-title"><Link to="/recipes"><em className="fa fa-home"></em>More-recipes</Link></h3>
          <ul className="nav sidebar-nav">
            <li className="nav-item"><Link className="nav-link active" to="/dashbord"><em className="fa fa-dashboard"></em> Dashboard <span className="sr-only">(current)</span></Link></li>
            <li className="nav-item"> 
              <Link to="/dashbord/all-recipe" className="nav-link" ><i className="fa fa-calendar-o"></i> All Recipe</Link>     
            </li>
            <li className="nav-item"> 
              <Link to="/dashbord/add-recipe" className="nav-link" ><i className="fa fa-calendar-o"></i> Add Recipe</Link>             
            </li>
            <li className="nav-item"> 
              <Link to="/dashbord/my-recipe" className="nav-link" ><i className="fa fa-calendar-o"></i> My Recipes</Link>             
            </li>

            <li className="nav-item"><Link to="/dashbord/favorite" className="nav-link" ><em className="fa fa-bar-chart"></em> Favorite Recipe</Link></li>
            
            <li className="nav-item">
              <Link className="nav-link" to="/profile"><em className="fa fa-user-circle mr-1"></em>Profile</Link></li>

            <li className="nav-item"> <button type="btn" onClick={this.signOut} className="btn bg-dark nav-link text-primary"><em className="fa fa-power-off"></em> Signout</button></li>
          </ul>
          <button className="btn bg-dark" onClick={() => toggleSideBar("secondSideBar")} id="menu-toggle"><em className="fa fa-bars bg-light"></em></button>
         </div>
        </nav>
       <div className="col-sm-3 mock" id={this.state.secondSideBar}></div>
       <div className="col-sm-1 " id={this.state.firstSideBar}></div>
       <main role="main" className="col-sm-9 col-md-8 col-lg-8 col-xl-8 main">
         <header className="page-header row justify-center">
           <div className="col-md-6 col-lg-8" >
             <h1 className="float-left text-center text-md-left" id="dash">Dashboard</h1>
           </div>
           <div className="dropdown user-dropdown col-md-6 col-lg-4 text-center text-md-right">
             <a className="btn btn-stripped dropdown-toggle" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <div><img src={"upload/"+this.props.user.image} alt="profile photo" className="rounded-circle float-left profile-photo" width="50" height="auto"/></div>
             
                  
                  <h6 className="text-muted">{this.props.user.username}</h6>
               
              </a>
              <div className="dropdown-menu dropdown-menu-right" style={{right: "1.5rem"}} aria-labelledby="dropdownMenuLink"><Link to="/profile" className="dropdown-item"><em className="fa fa-user-circle mr-1"></em> View Profile</Link>
                 <a className="dropdown-item" href="#">
                   <em className="fa fa-sliders mr-1"></em> Preferences
                 </a>
                 <a className="btn dropdown-item">
                   <em className="fa fa-power-off mr-1"></em> Logout
                 </a>
              </div>
           </div>
           <div className="clear"></div>
         </header>
       <div className="row">
         <main className="main col-sm-12">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">Home</li>
            <li className="breadcrumb-item active">Dashboard</li>
            
          </ol>
         </main>
         <div className="alert alert-warning alert-dismissible" role="alert" id={`show`+this.props.appMessage.message}>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <strong>
                  <span><font color='red'> 
                  {this.props.appMessage.message }!
                   </font>
                   </span>
                  </strong>
          </div>
       </div>
       <div className="row">
       <Route path="/dashbord/add-recipe" component={RecipeForm}/>
       <Route exact path="/dashbord" component={Home}/>
       <Route exact path="/dashbord" component={ TopReviews }/>
       <Route exact path="/dashbord" component={ Favorite }/>
       
       <Route path="/dashbord/favorite" component={ Favorite }/>
       <Route path="/dashbord/favorite" component={ TopReviews }/>
       <Route exact path="/dashbord/all-recipe" component={ AllRecipe }/>
       <Route exact path="/dashbord/my-recipe" component={ MyRecipes }/>
       <Route exact path="/dashbord/detail/:recipeId" component={ Detail }/>
       <Route exact path="/dashbord/edit/:recipeId" component={ EditRecipe }/>
           </div>
    </main>
      <div className="rightbar col-xs-3 col-sm-3" id={this.state.firstSideBar}>
         <br/> <br/>
         <div className="dropdown card-title-btn-container ">
           <h3 className="card-title">Timeline</h3>
           <button className="btn btn-sm btn-subtle dropdown-toggle float-right" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><em className="fa fa-cog"></em></button>
           <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton"><a className="dropdown-item" href="#"><em className="fa fa-search mr-1"></em> More info</a>
             <a className="dropdown-item" href="#"><em className="fa fa-thumb-tack mr-1"></em> Pin Window</a>
             <a className="dropdown-item" href="#"><em className="fa fa-remove mr-1"></em> Close Window</a></div>
         </div>
         <h6 className="card-subtitle mb-2 text-muted">What's coming up</h6>
         <ul className="timeline">
           <li>
             <div className="timeline-badge"><em className="fa fa-camera"></em></div>
             <div className="timeline-panel">
               <div className="timeline-heading">
                 <h5 className="timeline-title mt-2">Frofile</h5>
               </div>
               <div className="timeline-body">
                <ul>
                 <li><Link to="/profile">My profile</Link></li>
                 <li><h6><Link to="/profile">Change profile photo</Link></h6></li>
                 <li><h6><Link to="/profile">Edit profile</Link></h6></li>
                 <li><h6><Link to="/profile">Change Password</Link></h6></li>
                </ul>
               </div>
             </div>
           </li>
           <li>
             <div className="timeline-badge primary"><em className="fa fa-link"></em></div>
             <div className="timeline-panel">
               <div className="timeline-heading">
                 <h5 className="timeline-title mt-2">My Recipes</h5>
               </div>
               <div className="timeline-body">
                <p>
                 <ul>
                 <li><Link to="/dashbord/add-recipe">Add new Recipe</Link></li>
                 <li><Link to="/dashbord/favorite">All recipes</Link></li>
                 <li><Link to="/dashbord/favorite">My favorite recipes</Link></li>
                 <li><Link to="/dashbord/add-recipe">Add new favorite recipe</Link></li>
                 <li><Link to="/dashbord/my-recipe">add favorite recipe from my recipes</Link></li>
                </ul>
               </p>
               </div>
              </div>
            </li>           
            <li>
              <div className="timeline-badge"><em className="fa fa-paperclip"></em></div>
              <div className="timeline-panel">
                <div className="timeline-heading">
                  <h5 className="timeline-title mt-2">Vote</h5>
                </div>
                <div className="timeline-body">
                  <p>
                  <ul>
                 <li><Link to="/dashbord/add-recipe">Most upvoted recipes</Link></li>
                 <li>Recently reviewed</li>
                 <li><Link to="/dashbord/favorite">Top reviewed recipes</Link></li>
                 <li>top upvoted reviews</li>
                </ul>
                  </p>
                </div>
              </div>
            </li>              
          </ul>
        </div>
      </div>
    </div>

</div>

    );
  }
}
function mapStateToProps(state, ownProps) { 
 
      return {
        user:state.user,
        message: state.message,
        appMessage:state.appMessage
      };
    
  }
  function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(actions, dispatch)}
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Dashbord);