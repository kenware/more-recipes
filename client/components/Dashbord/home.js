import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom';
import { PropTypes } from 'react';
import  * as actions from '../../redux/Action/action.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'Recharts';

class Home extends Component {
    constructor(props){
        super(props)
this.state = { 
  
  }
 
}

 
 
render() {
  const data = [
    {name: 'rice recipe', upvote: 2000, downvote: 500,review:300},
    {name: 'Yam and beans', upvote: 2300, downvote: 1000,review:200},
    {name: 'Egusi soup', upvote: 2000, downvote: 500,review:400},
    {name: 'Fried Rice', upvote: 1000, downvote: 500,review:100},
    {name: 'Okro soup', upvote: 1000, downvote: 500,review:500},
   
    
];
    return (
      <div>
          <div className="col-sm-12">
          <h4 className="text-center text-primary"> Sumary of upvote/downvote and reviews of your top recipes</h4>
       <BarChart width={600} height={300} data={data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="name"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend />
       <Bar dataKey="upvote" fill="#8884d8" />
       <Bar dataKey="downvote" fill="#82ca9d" />
       <Bar dataKey="review" fill="#82c" />
      </BarChart>

      </div>
</div>

    );
  }
}

function mapStateToProps(state, ownProps) {   
    if (state.message) {
        return{
         message: state.message 
        } 
      
     } else{
       return {
        message: {id: '', messag: 'ken', breed: ''}
       }
     }
  }
  function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(actions, dispatch)}
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Home);