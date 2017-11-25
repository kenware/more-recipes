import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/home/index';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';  
import { Router, browserHistory } from 'react-router';  
import routes from './routes';
import configureStore from './redux/store';
import { Provider } from 'react-redux';
import {loadRecipes} from './redux/Action/action';
const store = configureStore();
store.dispatch(loadRecipes());
//import 'react-boostrap'
//import {Provider} from 'react-redux';
//import store from './redux/store';
//const root = document.querySelector('#app')
ReactDOM.render(
 <Provider store={store}>
  <Router history={browserHistory} routes={routes} />
 </Provider>
,document.getElementById('root'));