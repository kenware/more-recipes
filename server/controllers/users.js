import model from '../models';
const user = model.user;
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
const secret = "keeny"
const  favorite = model.favorite;
const recipesDetail = model.recipesDetail;

  const createUser = (req, res) => {
    let password = req.body.password;
    bcrypt.hash(password, 10, function(err, hash) {
     // Store hash in your password DB.
     
    return user
      .create({
        fullName: req.body.fullName,
        username: req.body.username,
        password: hash,
        email :   req.body.email,
        image:"http://res.cloudinary.com/more-recipes/image/upload/v1515499058/img-upload/file-1515499056661-user.png.png"
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
      return res.json({id:user.id,image:user.image,message:'succesful', token : token, username:user.username});
       
      }
       return res.json('incorrect password or email');
     });
     
   })
   .catch(error => res.status(400).json("incorrect password or email"));
  

};

const favoriteRecipes = (req, res) => {
  const myFavorite =[];
  return favorite
    .findAll({
        where: {
          UserId: req.decoded.id
        }
      })
    .then(favorite => {
      if (!favorite) {
        return res.status(404).json(' No favorite recipes Found');
      }
      recipesDetail
      .all()
      .then(recipesDetail =>{ 
        for(let x=0;x<favorite.length;x++){
           for(let recipe of recipesDetail){
            if(recipe.id==favorite[x].recipeId){
              myFavorite.push(recipe);
            }
           }

          
        }
        return res.status(201).json(myFavorite);
      })
      .catch(error => res.status(400).json("no recipes in in the list"));


    })
    .catch(error => res.status(405).send(error));
};

const refresh = (req, res) => {
    const id = req.decoded.id;
    const username = req.decoded.username;
    let token = jwt.sign({id : id,username: username }, secret, { expiresIn: 86400});
    return res.json({message:'succesful', token : token, username:username});
     
};
const allUsers = (req, res) => {
  return user
    .all()
    .then(users => res.status(200).send(users))
    .catch(error => res.status(400).send({message:"no recipes in in the list",error:error}));
}
const oneUser = (req, res) => {
  return user
    .findOne({
      where:{
        id:req.decoded.id
      }
    })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(400).send({message:"no recipes in in the list",error:error}));
}

const userUpdate = (req, res) => {
  let filename;
  return user
    .findOne({
        where: {
          id: req.decoded.id
        },
      })
    .then(user => {
      if (!user) {
        return res.status(404).json('user Not Found');
      }
      
      if(req.files.length!==0){
         filename = req.files[0].url;
         
      }else{
         filename = req.body.filename;
         
      }
      return user
        .update({
          fullName : req.body.fullName ,
          image: filename
        })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(405).send(error));
    
}

export default {
  createUser,
  userSignIn,
  favoriteRecipes,
  refresh,
  allUsers,
  oneUser,
  userUpdate
}