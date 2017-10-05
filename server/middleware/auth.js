
//import model from '../models';
//const user = model.User;

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


 

 export default {
  verifyToken


 }