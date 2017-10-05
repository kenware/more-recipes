import express from 'express';
let app = express();
import bodyParser from 'body-parser';
import morgan from 'morgan';

app.use(bodyParser.json());
/*if(config.util.getEnv('NODE_ENV') !== 'test') {
    //use morgan to log at command line
    app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}
*/
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json({ type: 'application/json'}));
import route from './server/route/index.js';

app.use('/api', route);
app.listen('3000', () => {
	console.log('server is running');
});

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

export default app;