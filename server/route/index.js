let express = require('express'), router = express.Router();
import User from '../controllers/users';
import recipe from '../controllers/recipes';
import auth from '../middleware/auth';


 router.post('/users/signup', User.createUser);
 router.post('/recipes',auth.verifyToken,recipe.createrecipe);
 router.post('/recipes/:recipesId',auth.verifyToken,recipe.update);
 router.post('/users/signin', User.userSignIn);

export default router;
