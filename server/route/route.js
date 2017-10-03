let express = require('express'), router = express.Router();
import recipe from "../controllers/index.js";


 router.get('/recipes',new recipe().listRecipe);

router.post('/recipes',new recipe().addRecipe);
router.put('/recipes/:recipesid',new recipe().updaterecipe);


 router.get('/recipes/:recipesid',new recipe().getRecipe);
 router.delete('/recipes/:recipesid',new recipe().deleteRecipe);
 router.post('/recipes/:recipesid/reviews',new recipe().reviewRecipe);

 router.get('/recipes/:recipesid/upvote',new recipe().upvoteRecipe);
 router.get('/recipes/:recipesid/downvote',new recipe().downvoteRecipe);
 router.get('/recipes/:recipesid/myReviews',new recipe().getReview);

//export router;
module.exports = router;