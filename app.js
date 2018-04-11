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
const { Client } = require('pg');
app.use(express.static(path.join(__dirname, '/client')));
const volleyball = require('volleyball');
app.use(volleyball);
app.use('/api', route);
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