
//import { connect } from 'react-redux';
//import default from '../../../server/middleware/auth';
//import { getAllTasks, postNewTask } from '../redux/reducer';
//import Task from './Task';

//import 'bootstrap/dist/css/bootstrap-theme.css';
import * as recipeAction from '../../redux/Action/action';
import React, { Component } from 'react'
import './index.scss';
import Header from '../App/common/header';

class Home extends Component {
  render() {
    return (
      <div>
       <Header.nav />
       <div >
          Welcome to React!
       </div>
       <Header.footer />
      </div>
    );
  }
}
export default Home;