import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom';
import { PropTypes } from 'react';
import  * as actions from '../../redux/Action/action.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './dashbord.scss'
import trim from '../trim';
import { Markup } from 'interweave';

class MyRecipe extends Component {
    constructor(props){
        super(props)
this.state = { 
  
  }
}

componentDidMount() {
   this.props.actions.loadMyRecipes();
  } 
 
render() {
 
    return (
<div className="col-sm-12">
   <div className="card mb-4">
        <div className="card-block">
          <div className="card-header">
            <h3 className="card-title">My Recipes</h3>
            
            <div className="dropdown card-title-btn-container float-right">
                <button className="btn btn-sm btn-subtle" type="button"><em className="fa fa-list-ul"></em> View All</button>
                
                <button className="btn btn-sm btn-subtle dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><em className="fa fa-cog"></em>
                </button>
                
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton"><a className="dropdown-item" href="#"><em className="fa fa-search mr-1"></em> More info</a>
                    <a className="dropdown-item" href="#"><em className="fa fa-thumb-tack mr-1"></em> Pin Window</a>
                    <a className="dropdown-item" href="#"><em className="fa fa-remove mr-1"></em> Close Window</a>
                </div>
            </div>
            
            <h6 className="card-subtitle mb-2 text-muted">List of all available recipe</h6>
            <h6 className="card-subtitle mb-2 text-muted">You have {this.props.recipes.length} recipes</h6>
            </div>
            <div className="divider" style={{marginTop: '1rem'}}></div>
            
            <div className="articles-container">
              { this.props.recipes.map(recipe=>
                <div  key={recipe.id} className="article border-bottom">
                    <div className="col-sm-12">
                        <div className="row">
                            <div className="col-3">
                               {recipe.createdAt}
                            </div>
                            <div className="col-2 date">
                            <a href={recipe.image}><img className="img-fluid rounded-circle card-img-top " src={recipe.image}/></a>
                            </div>
                            <div className="col-5">
                                <h4><Link to={`/dashbord/detail/${recipe.id}`}>recipe.title</Link></h4>
                                <p className="card-text">
                                <Markup content={ trim.trim(`${recipe.content}`) + '...'}
                                 />
                              <Link to={`/dashbord/detail/${recipe.id}`}>View &rarr; </Link></p>
                            </div>
                            <div className="col-2">
                              <p><Link to={`/dashbord/detail/${recipe.id}`}>View/Edit/Delete </Link></p>
                            </div>
                        </div>
                        <div className="alert alert-warning alert-dismissible" role="alert" id={`show`+ recipe.show}>
                          <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                          <strong>
                             <span><font color='red'> 
                              Add  recipe<br/>
                              <Link to={`/dashbord/detail/${recipe.id}`}> here </Link>
                
                              </font>
                               </span>
                           </strong>
            </div>
                    </div>
                    <div className="clear"></div>  
                    
                </div>
              )}
            </div>
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
  export default connect(mapStateToProps, mapDispatchToProps)(MyRecipe);