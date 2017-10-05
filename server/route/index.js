const express = require('express'), router = express.Router();
import User from '../controllers/users';
import recipe from '../controllers/recipes';
import auth from '../middleware/auth';
import review from '../controllers/review';


 router.post('/users/signup', auth.validate, User.createUser);
 router.post('/recipes',auth.verifyToken,recipe.createrecipe);
 router.put('/recipes/:recipesId',auth.verifyToken,recipe.update);
 router.delete('/recipes/:recipesId',auth.verifyToken,recipe.destroy);
 router.post('/users/signin', User.userSignIn);
 router.get('/recipes',recipe.list);
 router.post('/recipes/:recipesId/reviews',auth.verifyToken,review.reviewR);
 router.get('/users/:userId/recipes',auth.verifyToken, User.favorite);
 export default router;
