import model from '../models';
const user = model.user;
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
const secret = "keeny"
const  favorite = model.favorite;

  const createUser = (req, res) => {
    let password = req.body.password;
    bcrypt.hash(password, 10, function(err, hash) {
     // Store hash in your password DB.
     
    return user
      .create({
        fullName: req.body.fullName,
        username: req.body.username,
        password: hash,
        email :   req.body.email
      })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
    });
  
  };

const userSignIn = (req, res) => {
    const passwordy = req.body.password;
     user.findOne({ where: {
      email: req.body.email,
      //password :req.body.password
      }
     }).then(user => {
     bcrypt.compare(passwordy, user.password, function(err, match) {
      if (match){
      let token = jwt.sign({id : user.id,username:user.username }, secret, { expiresIn: 86400});
      return res.json({message:'succesful', token : token});
       
      }
       return res.json('incorrect password or email');
     });
     
   })
   .catch(error => res.status(400).send(res.json("incorrect password or email")));
  

};

const favoriteRecipes = (req, res) => {
  return favorite
    .findAll({
        where: {
          UserId: req.params.userId
        }
      })
    .then(favorite => {
      if (!favorite) {
        return res.status(404).send({
          message: ' No favorite recipes Found'
        });
      }
      return res.status(200).send({
        favoriteRecipes: favorite           
        });
    })
    .catch(error => res.status(405).send(error));
};



export default {
  createUser,
  userSignIn,
  favoriteRecipes
}