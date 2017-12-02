import React from 'react';  
//import { Route, IndexRoute } from 'react-router';  
import Home from './components/home/index';  
import Detail from './components/detail/index';  
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

const Routes = () =>(
<Router>
   <div className="primary-layout">
    <main>
      <Switch>
        <Route exact path="/recipes"  component={ Home } />
        <Route path="/recipes/:recipeId"  component={ Detail } />
        <Redirect to="/recipes" />
      </Switch>
    </main>
  </div>  
   </Router>
)
export default Routes

/*
export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    
    <Route path="/cats" component={CatsPage} onEnter={requireAuth}>
      <Route path="/cats/new" component={NewCatPage} />
      <Route path="/cats/:id" component={CatPage} />
    </Route>
    <Route path="/about" component={AboutPage} />
  </Route>
);
*/