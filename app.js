import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import morgan from 'morgan';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json({ type: 'application/json'}));
import route from './server/route/index.js';
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});
app.use('/api', route);


app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.'
}));

app.listen(process.env.PORT || '5000', () => {
	console.log('server is running');
});
export default app;