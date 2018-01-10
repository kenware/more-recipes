
//import 'bootstrap/dist/css/bootstrap-theme.css';
import { PropTypes } from 'react';
import { Link, Redirect } from 'react-router-dom';
//import { Link } from 'react-router';
import  * as actions from '../../redux/Action/action.js';
import React, { Component } from 'react'
import './index.scss';
import Header from '../App/common/header';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Markup } from 'interweave';
import trim from '../trim';
import ReactEasyPaginate from 'react-easy-paginate';
import 'react-easy-paginate/dist/react-easy-paginate.css';
const limit = 6;
class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      data:this.props.recipes,
      url:<s/>,
      r:"",
      show:"",
      search:" "
      }
      this.handlePaginateClick = this.handlePaginateClick.bind(this);
      this.onCancel = this.onCancel.bind(this)
      this.onChange = this.onChange.bind(this)
      this.search = this.search.bind(this)
  }

  componentWillMount() {
    const pag = this.props.match.params.page;
    const defaultPage =1;
    if (pag) {
      this.props.actions.loadRecipes('id','DESC',pag,limit,'none');
    }else{
      this.props.actions.loadRecipes('id','DESC',defaultPage,limit,'none');
    }
    

  }
componentDidMount(){
  var navpos = $("#navbar").offset().top;
	$(window).scroll(function(){
		//echo("here");
		var windpos = $(window).scrollTop();
		if (windpos>navpos){
			$("#navbar").addClass("fixed-top");
		}else{
			$("#navbar").removeClass("fixed-top");
		}
	})
 }

handlePaginateClick(pageNum) {
  this.props.actions.loadRecipes('id','DESC',pageNum,limit,'none');
  //this.getData(offset, limit);
 this.setState({url: <Redirect to={`/recipes/page/`+pageNum}/>})
 console.log(this.props.recipes)
 
  //this.setState({url,})
}
onCancel(e){
  this.setState({show:"show"})
}
onChange(e){
  const state = this.state;
  state[e.target.name] = e.target.value;
 this.setState(state);

}
search(e){
  const keyword=this.state.search;
  //if(keyword!==" "){
  this.props.actions.loadRecipes('id','DESC',1,limit,keyword);
  //}
}

  render() {
    const recipes = this.props.paginate;
  
        return (
     
      <div>
        
        <div>
        </div>
       <div className="row bg-dark" id="top-back">
       <div className="col-3">
       {this.state.url}
       </div>
       <div className="col-7"> 
         
<div id="demo" className="carousel slide" data-ride="carousel">
  <ul className="carousel-indicators">
    <li data-target="#demo" data-slide-to="0" className="active"></li>
    <li data-target="#demo" data-slide-to="1"></li>
    <li data-target="#demo" data-slide-to="2"></li>
  </ul>
  <div className="carousel-inner">
    <div className="carousel-item active">
    <img src="image/l.png" alt="New York" className="carousel-img"/>
      <div className="carousel-caption">
        <h3>Get Your Favorite Recipe</h3>
        <p>Get recipes that improve your health</p>
      </div>   
    </div>
    <div className="carousel-item">
    <img src="image/v.jpg" alt="New York" className="carousel-img"/>
      <div className="carousel-caption">
        <h3>Health is wealth</h3>
        <p>This is amazing!</p>
      </div>   
    </div>
    <div className="carousel-item">
      <img src="image/m.jpg" alt="New York" className="carousel-img"/>
      <div className="carousel-caption">
        <h3>I love Peach</h3>
        <p>We love the Big Apple!</p>
      </div>   
    </div>
  </div>
  <a className="carousel-control-prev" href="#demo" data-slide="prev">
    <span className="carousel-control-prev-icon bg-dark"></span>
  </a>
  <a className="carousel-control-next" href="#demo" data-slide="next">
    <span className="carousel-control-next-icon"></span>
  </a>
</div>
       </div>
       <div className="col-2">
       </div>
      </div>
      <Header.nav />
  <div className="bg-container">
    <div className="container bg-container">
      <div className="row" id="">
       <div className="col-sm-12 col-md-4">
        <div className="card my-4">
        <h6 className="card-header">Search recipes by title,contents or ingredients{this.state.r}</h6>
        <div className="card-body">
        <form>
          <div className="input-group">
           
            <input type="text" onChange={this.onChange} name="search" className="form-control" placeholder="enter keyword"/>
            <span className="input-group-btn">
              <button onClick={this.search} className="btn btn-secondary" type="button">Search</button>
            </span>
          
          </div>
          </form>
        </div>
       </div>
      </div>
      <div className="col-sm-12 col-md-4 text-center">
        <img src="image/l.png" id="App-logo" className="rounded-circle" style={{height:"9rem",width:"9rem"}} />
      </div>
      <div className="col-sm-12 col-md-4">
      <div className="card my-4">
    
      <div className="card-body">
        <div className="row"> 
          <div className="col-6">     
            <ul className="list-unstyled mb-0">
              
              <li>
              <Link to={'/signup'}>sign Up</Link>
              </li>
              <li>
              <Link to={'/login'}>login</Link>
              </li>
              <li>
                 <Link to={'/profile'}>profile</Link>
              </li>
              <li>
              <Link to={'/dashbord'}>dashbord</Link>
                
              </li>
              
            </ul> 
            </div>
            <div className="col-6">     
            <ul className="list-unstyled mb-0">
              <li>
                <Link to={'/dashbord/favorite'}>My Favorite</Link>
              </li>
              <li>
              <Link to={'/dashbord/add-recipe'}>Add Recipe</Link>
              </li>
              <li>
              <Link to={'/dashbord/my-recipe'}>My Recipes</Link>
              </li>
              <li>
                <Link to={'/dashbord/favorite'}>Top Recipes</Link>
              </li>
              
            </ul> 
            </div>                  
        </div>
      </div>
    </div>
    </div>
    
      </div>
      <div className="row bg" id="">
      <div className="col-sm-12">
      <h2 className="my-4 text-center" align="center">
        All Available Recipes
      </h2>
      <div className="content landing" id={this.state.show}>
        <div className="modal-header">
          <h4 className="modal-title text-danger">Info!</h4>
          <button type="button" onClick={ this.onCancel }  className="close" data-dismiss="modal">&times;</button>
        </div>
        <div className="modal-body text-danger text-center">
           More-recipes is designed to allow people across culture, country and world 
           to share their recipes.This means that you can prepare any recipe perculiar to
            any culture without travelling to that location.<br/>
           <img src={`upload/g.jpg`} className="rounded-circle img-default"/>
        </div>
        <div className="modal-footer">
          <button type="button" onClick={ this.onCancel } className="btn btn-info" data-dismiss="modal">Cancel</button>
        </div>

      </div>
      </div>
      </div>
      <div className="row" id="bg">
      <div className="col-md-12 col-md-1" >

         </div>
        <div className="col-md-12 col-md-10">
        <br/>
         <div className="row">
          { recipes.map(recipe =>
           <div key={recipe.id}   className="col-sm-12 col-md-6 col-lg-4 " >
            <div className="card border-secondary mb-2 justify" style={{height:"25rem"}} >
             <div className="card-header">
             <h6 className="card-title"><font color="lightseagreen"><Link to={`/recipes/${recipe.id}`}>{ recipe.title }</Link></font></h6>
             </div>
              <div className="card-body justify">
               <div className="text-center"><img className="img-flud rounded-circle card-img-top " src={recipe.image}
                alt="Recipe Image"/></div>
               <p className="card-text">
                 <Markup content={ trim(`${recipe.content}`)+`...<a href="/recipes/${recipe.id}">continue</a>` }
                 tagName="span" /><br />
                 <i className="fa fa-star text-info" aria-hidden="true"></i>
                 <i className="fa fa-star text-info" aria-hidden="true"></i>
                 <i className="fa fa-star text-info" aria-hidden="true"></i>
                 <i className="fa fa-star text-info" aria-hidden="true"></i>
                 <button className="btn btn-outline-success btn-sm">
                 <i className="fa fa-thumbs-up text-primary" aria-hidden="true"></i>&nbsp;
                 {recipe.upvote}
                 </button>
               </p>
               
              </div>
            </div>
          </div> 
          )}
         </div>
         <br/>
        </div>
        <div className="col-md-12 col-md-1" id="bg">

        </div>
      </div>
      <div className="row">
    <div id="react-easy-paginate" className="col-12 text-center">
          <ReactEasyPaginate pageTotal={Math.floor(this.props.recipes.length / limit) + 1} rangeDisplayed={4} onClick={this.handlePaginateClick} />
        </div>
     </div> 
    </div>
   </div> 
       <Header.footer />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) { 
    return {
      recipes: state.recipes,
      paginate:state.paginate
    };
  

}
function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);