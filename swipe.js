import express from 'express';
const app = express();
import bodyparser from 'body-parser';
import morgan from 'morgan';

app.use(bodyparser.json({type:'application/json'}));
app.use(bodyparser.urlencoded({extended:true}));
app.use(morgan('default'));
import route from './serve/route';
app.use('api',route);
app.get('*',(req,res)=>{
   return res.json({message:'welcome to home page'});
})
app.listen(5000,()=>{
    console.log('server is running');
})
export default app;