import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import morgan from 'morgan';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json({ type: 'application/json'}));
import route from './server/route/index.js';

app.use('/api', route);


app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.'
}));

app.listen(process.env.PORT || '5000', () => {
	console.log('server is running');
});

export default app;