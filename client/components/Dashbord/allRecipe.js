import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom';
import { PropTypes } from 'react';
import  * as actions from '../../redux/Action/action.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './dashbord.scss'
import trim from '../trim';
import { Markup } from 'interweave';
import ReactEasyPaginate from 'react-easy-paginate';
import 'react-easy-paginate/dist/react-easy-paginate.css';
const limit = 6;
class AllRecipe extends Component {
    constructor(props){
        super(props)
this.state = { 
  
  }
  this.handlePaginateClick = this.handlePaginateClick.bind(this)
}

componentWillMount() {
  
  
    this.props.actions.loadRecipes('id','DESC',1,limit,'none');
  
  
}
handlePaginateClick(pageNum) {
  this.props.actions.loadRecipes('id','DESC',pageNum,limit);
  
}
 
render() {
 
    return (
<div className="col-12">
<div className="row">
   <div className="card mb-4 col-12">
        <div className="card-block">
          <div className="card-header">
            <h3 className="card-title">All Recipes</h3>
            
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
          </div>
            <div className="divider" style={{marginTop: '1rem'}}></div>
            
            <div className="articles-container">
              { this.props.paginate.map(recipe=>
                <div  key={recipe.id} className="article border-bottom">
                    <div className="col-xs-12">
                        <div className="row">
                            <div className="col-2">
                               {recipe.createdAt}
                            </div>
                            <div className="col-2 date">
                            <a href={`upload/${recipe.image}`}><img className="img-fluid rounded-circle card-img-top " src={`upload/${recipe.image}`}/></a>
                            </div>
                            <div className="col-5">
                                <h4><Link to={`/dashbord/detail/${recipe.id}`}>recipe.title</Link></h4>
                                <p className="card-text">
                                <Markup content={ trim(`${recipe.content}`) + '...'}
                                 />
                              <Link to={`/dashbord/detail/${recipe.id}`}>Read More &rarr; </Link></p>
                            </div>
                            <div className="col-3">
                             <Link to={`/dashbord/detail/${recipe.id}`}>add favorite/View</Link>
                            </div>
                        </div>
                    </div>
                    <div className="clear"></div>  
                    
                </div>
              )}
            </div>
        </div>
    </div> 
    </div>
    <div className="row">
    <div id="react-easy-paginate" className="col-12 text-center">
          <ReactEasyPaginate pageTotal={Math.floor(this.props.recipes.length / limit) + 1} rangeDisplayed={4} onClick={this.handlePaginateClick} />
        </div>
     </div>      

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
  export default connect(mapStateToProps, mapDispatchToProps)(AllRecipe);