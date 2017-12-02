import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import morgan from 'morgan';
const path = require('path');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import React from 'react';

app.use(bodyParser.json({ type: 'application/json'}));
import route from './server/route/index.js';
const { Client } = require('pg');
app.use('/api', route);
app.use(express.static(path.join(__dirname, 'client/')));
const volleyball = require('volleyball');
app.use(volleyball);
//serve up static files
//app.use(express.static(path.resolve(__dirname, '..', 'client')));
app.use(express.static(path.resolve(__dirname, '..', 'node_modules')));
/*
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  //ssl: true,
});

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});
*/
import routes from './client/routes'

app.get('*', (req, res) => {
  Router.run(routes, req.path, function (Handler, state) {
  var element = React.createElement(Handler);
  var html = React.renderToString(element);
  res.render('main', { content: html });
});
});
app.listen('5000', () => {
	console.log('server is running');
});
export default app;