import React, {Component} from 'react';
import { connect } from 'react-redux';
//import default from '../../../server/middleware/auth';
//import { getAllTasks, postNewTask } from '../redux/reducer';
//import Task from './Task';
class home extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
  
  }
  render() {
    return (
      <div>
      <div className="container">
      <h1>redux is here</h1>
      </div>

      </div>
    )
  }
}
export default home;