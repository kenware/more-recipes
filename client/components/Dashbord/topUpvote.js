import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom';
import { PropTypes } from 'react';
import  * as actions from '../../redux/Action/action.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './dashbord.scss'
import trim from '../trim';
import { Markup } from 'interweave';

class TopReviews extends Component {
    constructor(props){
        super(props)
this.state = { 
  
  }
 
}
componentWillMount() {
    this.props.actions.loadRecipes('upvote','DESC',1,3,'none');
  
   
   }
  

 
 
render() {
 
    return (
<div className="col-sm-12">
<div className="card mb-4">
<div className="card-block">
 <div className="card-header">
    <h3 className="card-title text-info text-center">Top Upvoted Recipes</h3>
    
    <div className="dropdown card-title-btn-container float-right">
        <button className="btn btn-sm btn-subtle" type="button"><em className="fa fa-list-ul"></em> View All</button>
        
        <button className="btn btn-sm btn-subtle dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><em className="fa fa-cog"></em></button>
        
        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton"><a className="dropdown-item" href="#"><em className="fa fa-search mr-1"></em> More info</a>
            <a className="dropdown-item" href="#"><em className="fa fa-thumb-tack mr-1"></em> Pin Window</a>
            <a className="dropdown-item" href="#"><em className="fa fa-remove mr-1"></em> Close Window</a>
        </div>
    </div>
    </div>
    <div className="table-responsive">
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>date</th>
                    <th>upvot</th>
                    <th>title</th>
                    
                    <th>Contents</th>
                    
                    <th>detail</th>
                </tr>
            </thead>
            
            <tbody>
               {this.props.recipes.map(recipe=>
                <tr>
                    <td>{recipe.createdAt}</td>
                    <td>{recipe.upvote}</td>
                    <td><Link to={`/dashbord/detail/${recipe.id}`}>{recipe.title}</Link></td>
                    
                    <td><Markup content={ trim(`${recipe.content}`) + '...'}
                                 />
                    </td>
                    <td><Link to={`/dashbord/detail/${recipe.id}`}> view/delete/add favorite </Link></td>
                </tr>
                
               )}
            </tbody>
        </table>
    </div>
</div>
</div>
</div>

    );
  }
}

function mapStateToProps(state, ownProps) {
 
       return {recipes:state.paginate}
  
  }
  function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(actions, dispatch)}
  }
  export default connect(mapStateToProps, mapDispatchToProps)(TopReviews);