import React from 'react';  
//import { Route, IndexRoute } from 'react-router';  
import Home from './components/home/index';  
import Detail from './components/detail/index';  
import Login from './components/login/index'; 
import Register from './components/register/index';
import Dashbord from './components/Dashbord/dashbord';
import Profile from './components/profile/index';
import {Router, Route, Switch, Redirect } from 'react-router-dom'
import history from './history';

const Routes = () =>(
<Router history={history}>
   <div className="primary-layout">
    <main>
      <Switch>
        <Route exact path="/recipes"  component={ Home } />
        <Route path="/recipes/page/:page"  component={ Home } />
        <Route path="/recipes/:recipeId"  component={ Detail } />
        <Route exact path="/login"  component={ Login } />
        <Route exact path="/signup"  component={ Register } />
        <Route path="/dashbord"  component={ Dashbord } />
        <Route path="/profile"  component={ Profile } />
        <Redirect to="/recipes"/>
      </Switch>
    </main>
  </div>  
  </Router>
)
export default Routes

/*
export default (
  <Route >
    <Route path="/recipes" component={Home} >
       <Route path="/recipes/:recipeId" component={Detail} />
    </Route>
    
  </Route>
);
*/