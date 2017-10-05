let express = require('express'), router = express.Router();
import User from '../controllers/users';
import recipe from '../controllers/recipes';
import auth from '../middleware/auth';


 router.post('/users/signup', User.createUser);
 router.post('/recipes',auth.verifyToken,recipe.createrecipe);
 router.put('/recipes/:recipesId',auth.verifyToken,recipe.update);
 router.delete('/recipes/:recipesId',auth.verifyToken,recipe.destroy);
 router.post('/users/signin', User.userSignIn);
 router.get('/recipes',recipe.list);

export default router;
