let express = require('express'); 
let app = express();
let bodyParser = require('body-parser'); 
let morgan = require('morgan');

app.use(bodyParser.json()); 
/*if(config.util.getEnv('NODE_ENV') !== 'test') {
    //use morgan to log at command line
    app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}
*/
app.use(morgan('combined'));
app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));  

//app.use(require('./dist/route/route'));
//app.use(require('./dist/controllers'
//import app from "./dist/route/route";
let route = require('./dist/route/route.js');

app.use('/api', route);


app.get('*', (req, res) => res.status(200).send({
 // message: 'Welcome to the beginning of nothingness.',
}));

module.exports = app;