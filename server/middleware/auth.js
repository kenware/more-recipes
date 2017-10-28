
import model from '../models';
const user = model.user;
import validator from 'validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
const secret = "keeny"
 
const verifyToken = (req, res, next) => {
   const token = req.headers.authorization || req.headers['x-access-token'];
   if (!token) {
     return res.status(401).send({ message: 'Unauthorized Access' });
     }

   jwt.verify(token, secret, (err, result) => {
      if (err) {
        return res.status(401).send({ message: 'Invalid Token' });
      }
    req.decoded = result;
    next();
   });
 }

const validate = (req, res, next) => {
   let email = req.body.email + "";
   if(!validator.isEmail(email)){
       return res.status(401).send(res.json('Invalid email address'));
   };
   if ((req.body.username) == null){
       return res.status(401).send(res.json('username cannot be empty'));
   }
   if ((req.body.username) == ""){
       return res.status(401).send(res.json('username cannot be empty'));
   }
   if ((req.body.username.length) <2){
       return res.status(401).send(res.json('username must have minimum of two character'));
   }
    if ((req.body.password) == null){
       return res.status(401).send(res.json('password cannot be empty'));
   }
   if ((req.body.password) == ""){
       return res.status(401).send(res.json('password cannot be empty'));
   }
   if ((req.body.password.length) <2){
       return res.status(401).send(res.json('password must have minimum of two character'));
   }
    if ((req.body.fullName) == null){
       return res.status(401).send(res.json('name cannot be empty'));
   }
   if ((req.body.fullName) == ""){
       return res.status(401).send(res.json('name cannot be empty'));
   }
   if ((req.body.fullName.length) <2){
       return res.status(401).send(res.json('name must have minimum of two character'));
   }
   user.findOne({ where: {
      email: req.body.email    
      }
   })
   .then(User => {
      if (!User) {
        user.findOne({ where: {
          username: req.body.username      
          }
        })
        .then(user => {
           if (!user) {
             next();
           }else{
             return res.json('username already exist');
           }
        });
      }else{
        return res.json('email already exist');
      }
   });
   
   
 }



 export default {
  verifyToken,
  validate
 }