
import model from '../models';
const user = model.user;
const recipesDetail =model.recipesDetail;
import validator from 'validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
const secret = "keeny"
 
const verifyToken = (req, res, next) => {
   const token = req.headers.authorization || req.headers['x-access-token'];
   if (!token) {
     return res.status(401).json('Unauthorized Access');
     }

   jwt.verify(token, secret, (err, result) => {
      if (err) {
        return res.status(401).json('Please login!');
      }
    req.decoded = result;
    next();
   });
 }

const validate = (req, res, next) => {
   let email = req.body.email+"";
   if(!validator.isEmail(email)){
       return res.status(401).json('Invalid email address');
   };
   if ((req.body.username) == null){
       return res.status(401).json('username cannot be empty');
   }
   if ((req.body.username) == ""){
       return res.status(401).json('username cannot be empty');
   }
   if ((req.body.username.length) <2){
       return res.status(401).json('username must have minimum of two character');
   }
    if ((req.body.password) == null){
       return res.status(401).json('password cannot be empty');
   }
   if ((req.body.password) == ""){
       return res.status(401).json('password cannot be empty');
   }
   if ((req.body.password.length) <2){
       return res.status(401).json('password must have minimum of two character');
   }
    if ((req.body.fullName) == null){
       return res.status(401).json('name cannot be empty');
   }
   if ((req.body.fullName) == ""){
       return res.status(401).json('name cannot be empty');
   }
   if ((req.body.fullName.length) <2){
       return res.status(401).json('name must have minimum of two character');
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

 const verifyUpdate = (req, res,next) => {
    return recipesDetail
      .findOne({
          where: {
            UserId: req.decoded.id,
            id: req.params.recipesId
          },
        })
      .then(recipesDetail => {
        if (!recipesDetail) {
          return res.status(404).json('recepes Not Found');
        }
        next();
    })
}



 export default {
  verifyToken,
  validate,
  verifyUpdate
 }