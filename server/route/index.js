const express = require('express'), router = express.Router();
import User from '../controllers/users';
import recipe from '../controllers/recipes';
import auth from '../middleware/auth';
import review from '../controllers/review';
import favorite from '../controllers/favorite';

 //signup
 router.post('/users/signup', auth.validate, User.createUser);
 //sign in
 router.post('/users/signin', User.userSignIn);
 //get favorite recipes
 router.get('/users/:userId/recipes',auth.verifyToken, User.favoriteRecipes);

 //recipes route
 //create recipes
 router.post('/recipes',auth.verifyToken,recipe.createrecipe);
 //update recipes
 router.put('/recipes/:recipesId',auth.verifyToken,recipe.update);
 //get a recipes
 router.get('/recipes/:recipesId',recipe.getOneRecipe);
 //delete recipes
 router.delete('/recipes/:recipesId',auth.verifyToken,recipe.destroy);
 //get  recipes with most upvote
 router.get('/recipes/sorts/',auth.verifyToken,recipe.sortBy);
 //get all recipes
 router.get('/recipes',recipe.list);
 //review a recipes
 router.post('/recipes/:recipesId/reviews',auth.verifyToken,review.reviewR);
 //upvote a recipes
 router.put('/recipes/:recipesId/upvote',auth.verifyToken,recipe.upvote);
 //downvote a recipes
 router.put('/recipes/:recipesId/downvote',auth.verifyToken,recipe.downvote);
 
  //create favorite recipes
 router.post('/recipes/:favorite/favorite',auth.verifyToken,favorite.createfavorite);
 //get new token on page refresh
 router.get('/refresh',auth.verifyToken,User.refresh);
 
 export default router;
