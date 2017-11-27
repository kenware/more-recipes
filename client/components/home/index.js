
//import { connect } from 'react-redux';
//import default from '../../../server/middleware/auth';
//import { getAllTasks, postNewTask } from '../redux/reducer';
//import Task from './Task';

//import 'bootstrap/dist/css/bootstrap-theme.css';
import { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import  * as actions from '../../redux/Action/action';
import React, { Component } from 'react'
import './index.scss';
import Header from '../App/common/header';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//import RecipeList from './homeList';

class Home extends Component {
  componentWillMount() {
    if (this.props.recipes[0].id == '') {
      this.props.actions.loadRecipes();
    }
  }
  
  render() {
    const recipes = this.props.recipes
    return (
      
      <div>
       <Header.nav />
       <div className="col-md-8">
        
       <ul className="list-group">
       { recipes.map(recipe => 
          <li className="list-group-item" key={recipe.id}>{recipe.title}</li>
       )}
     </ul>
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