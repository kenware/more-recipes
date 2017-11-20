import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom'
import './index.css';
import registerServiceWorker from './registerServiceWorker';
//import primaryApp from './route';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import App from './component/app/App';
import detail from './component/detail/index';
import bord from './component/dashbord/index';
import register from './component/signup/index';
import login from './component/login/index';
import footer from './component/app/nav';

render(
	<BrowserRouter>
   <div className="primary-layout">
    <main>
      <Switch>
        <Route path="/" exact component={ App } />
        <Route path="/detail/:recipeId" component={ detail } />
        <Route path="/register" component={ register } />
        <Route path="/login" component={ login } />
        <Route path="/dashbord" component={ bord } />
        <Redirect to="/" />
      </Switch>
    </main>
    <footer.footer />
  </div>  
   </BrowserRouter>
,document.getElementById('root'));
registerServiceWorker();
