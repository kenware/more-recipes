import React from 'react';  
import { Route, IndexRoute } from 'react-router';  
import Home from './components/home/index';  
import Detail from './components/detail/index';  

export default ( 
  <Route> 
  <Route path="/" component={ Home } />
  <Route path="/detail" component={ Detail } />
  </Route>
);