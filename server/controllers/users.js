import model from '../models';
const user = model.User;
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
const secret = "keeny"

  const createUser = (req, res) => {
    return user
      .create({
        fullName: req.body.fullName,
        username: req.body.username,
        password: req.body.password,
        email :   req.body.email
      })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
  
};

const userSignIn = (req, res) => {
     user.findOne({ where: {
      email: req.body.email,
      password :req.body.password
      }
     }).then(user => {
    let token = jwt.sign({id : user.id }, secret, { expiresIn: 86400});
    res.status(201).send({message:'succesful', token : token});
   })
   .catch(error => res.status(400).send(error));


};



export default {
  createUser,
  userSignIn
}