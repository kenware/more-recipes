const express = require('express'), router = express.Router();
import User from '../controllers/users';
import recipe from '../controllers/recipes';
import auth from '../middleware/auth';
import review from '../controllers/review';
import favorite from '../controllers/favorite';
import multer from 'multer';
import cloudinary from 'cloudinary';
import cloudinaryStorage from 'multer-storage-cloudinary';

cloudinary.config({ 
  cloud_name: 'more-recipes', 
  api_key: '127278553653283', 
  api_secret: 'XUBlnwpJ2dbSHJzPZu-vTWxgob4' 
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'img-upload',
  filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+'-'+file.originalname)
    }
  })
let upload = multer({ storage: storage })

 //signup
 router.post('/users/signup', auth.validate, User.createUser);
 //sign in
 router.post('/users/signin', User.userSignIn);
 //get favorite recipes
 router.get('/users/favoriteRecipes',auth.verifyToken, User.favoriteRecipes);
 router.get('/users', User.allUsers);
 router.get('/user',auth.verifyToken,User.oneUser);
 router.put('/user/update',auth.verifyToken,upload.array('file'),User.userUpdate);
 //recipes route
 //create recipes
 router.post('/recipes',auth.verifyToken,upload.array('file'),recipe.createrecipe);
 //update recipes
 router.put('/recipes/:recipesId',auth.verifyToken,auth.verifyUpdate,upload.array('file'),recipe.update);
 
 //delete recipes
 router.delete('/recipes/:recipesId',auth.verifyToken,recipe.destroy);
 //get  recipes with most upvote
 router.get('/recipes/sorts/',recipe.sortBy);
 //get recipes a user added
 router.get('/recipes/userRecipes',auth.verifyToken,recipe.userList);
 //get a recipes
 router.get('/recipes/:recipesId',recipe.getOneRecipe);
 //get all recipes
 router.get('/recipes',recipe.list);
 
 //review a recipes
 router.post('/recipes/:recipesId/reviews',auth.verifyToken,review.reviewR);
 //get a review
 router.get('/recipes/:recipesId/getreviews',review.getReview);
 //upvote a recipes
 router.put('/recipes/:recipesId/upvote',auth.verifyToken,recipe.upvote);
 //downvote a recipes
 router.put('/recipes/:recipesId/downvote',auth.verifyToken,recipe.downvote);
 
  //create favorite recipes
 router.post('/recipes/:favorite/favorite',auth.verifyToken,favorite.createfavorite);
 //get new token on page refresh
 router.get('/refresh',auth.verifyToken,User.refresh);
 //search
 router.get('/searchRecipes/',recipe.search);
 export default router;
