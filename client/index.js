import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import Home from './components/home/index';
//import './components/home/Navsticky';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';  
//import { Router, browserHistory } from 'react-router';  
import Routes from './routes';
import configureStore from './redux/store';
import { Provider } from 'react-redux';
import {loadRecipes} from './redux/Action/action';
const store = configureStore();
//store.dispatch(loadRecipes());
//import 'react-boostrap'
//import {Provider} from 'react-redux';
//import store from './redux/store';
//const root = document.querySelector('#app')
render(
 <Provider store={ store }>
  <Routes />
 </Provider>
,document.getElementById('root'));