
import { PropTypes } from 'react';
import { Link  } from 'react-router-dom';
//import { Link } from 'react-router';
import  * as actions from '../../redux/Action/action.js';
import React, { Component } from 'react'
import './index.scss';
import Header from '../App/common/header';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Markup } from 'interweave';
import trim from '../trim';
import {TinyPagination} from 'react-pagination-custom'
class App extends React.Component {
 
  constructor(props){
    super(props);
    this.state = {props};
    this.changePage = this.changePage.bind(this);
    this.renderBtnNumber = this.renderBtnNumber.bind(this);
  }
 
  changePage(id){
    this.setState((prevState, props) => { 
      return { 
        prevState,
        selectedPageId: id 
       }
    });    
  }
 
  buttonPageClick(id){
    let {selectedPageId} = this.state;
    switch (id) {
      case 'PRE':
        this.changePage(selectedPageId - 1);
        break;
      case 'NEXT':
        this.changePage(selectedPageId + 1);
        break;
      default:
        this.changePage(id);
        break;
    }
  }
 
  renderBtnNumber(id){
    let {selectedPageId} = this.state;
    return(
      <button
        onClick = {this.buttonPageClick.bind(this, id)}
        key = {id}
        className = {`page ${selectedPageId === id? 'selected-page' : ''}`}
      >
        {id}
      </button>
    );
  }
 
  render() {
    let {selectedPageId, list} = this.state;
    const itemPerPage = 5;
    const maxBtnNumbers = 6;
    let listShow = [...list];
    listShow = listShow.splice((selectedPageId - 1) * itemPerPage, itemPerPage);
    return (
      <div>
        <ul>
          {listShow.map(i => <li key={i.name}> {i.name}</li>)}
        </ul>
        <TinyPagination
          total = {list.length}
          selectedPageId = {selectedPageId}
          itemPerPage = {itemPerPage}
          renderBtnNumber = {this.renderBtnNumber}
          maxBtnNumbers = {maxBtnNumbers}
          preKey = 'PRE'
          nextKey = 'NEXT'
          wrapStyle = {{backgroundColor: '#ffffff'}}
          wrapClass = 'page-container'
          btnsClass = 'btns-container'
          counterClass = 'counter-container'
          counterStyle = {{color: 'gray'}}
          spreadClass = 'spread-container'
          spreadStyle = {{padding: '0 5px'}}
        />
      </div>
    )
  }
}
 
App.defaultProps = {
  selectedPageId: 1,
  list: [
    {name: 'item 1'},{name: 'item 2'},{name: 'item 3'},{name: 'item 4'},{name: 'item 5'},{name: 'item 6'},{name: 'item 7'},{name: 'item 8'},{name: 'item 9'},{name: 'item 10'},{name: 'item 11'},{name: 'item 12'},{name: 'item 13'},{name: 'item 14'},{name: 'item 15'},{name: 'item 16'},{name: 'item 17'},{name: 'item 18'},{name: 'item 19'},{name: 'item 20'},{name: 'item 21'},{name: 'item 22'},{name: 'item 23'},{name: 'item 24'},{name: 'item 25'},{name: 'item 26'},{name: 'item 27'},{name: 'item 28'},{name: 'item 29'},{name: 'item 30'},{name: 'item 31'},{name: 'item 32'},{name: 'item 33'},{name: 'item 34'},{name: 'item 35'},{name: 'item 36'},{name: 'item 37'},{name: 'item 38'},{name: 'item 39'},{name: 'item 40'},{name: 'item 41'},{name: 'item 42'},{name: 'item 43'},{name: 'item 44'},{name: 'item 45'},{name: 'item 46'},{name: 'item 47'},{name: 'item 48'}
  ],
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
  export default connect(mapStateToProps, mapDispatchToProps)(App);
