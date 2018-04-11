import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import morgan from 'morgan';
const path = require('path');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

app.use(bodyParser.json({ type: 'application/json'}));
import route from './server/route/index.js';
//const { Client } = require('pg');
app.use(express.static(path.join(__dirname, '/client')));
const volleyball = require('volleyball');
app.use(volleyball);
app.use('/api', route);

var pg = require('pg');
//or native libpq bindings
//var pg = require('pg').native

var conString = process.env.ELEPHANTSQL_URL || "postgres://postgres:5432@localhost/postgres";

var client = new pg.Client(conString);
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query('SELECT NOW() AS "theTime"', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].theTime);
    //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
    client.end();
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/index.html'));
});
app.listen(process.env.PORT || '5000', (err) => {
  console.log("server is running");
  /*if (err) {
    console.log(err);
  } else {
    open(`http://localhost:5000`);
  }*/
});
export default app;