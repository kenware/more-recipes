'use strict';

var _index = require('../controllers/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express'),
    router = express.Router();


router.get('/recipes', new _index2.default().listRecipe);

router.post('/recipes', new _index2.default().addRecipe);
router.put('/recipes/:recipesid', new _index2.default().updaterecipe);

router.get('/recipes/:recipesid', new _index2.default().getRecipe);
router.delete('/recipes/:recipesid', new _index2.default().deleteRecipe);
router.post('/recipes/:recipesid/reviews', new _index2.default().reviewRecipe);

router.get('/recipes/:recipesid/upvote', new _index2.default().upvoteRecipe);
router.get('/recipes/:recipesid/downvote', new _index2.default().downvoteRecipe);
router.get('/recipes/:recipesid/myReviews', new _index2.default().getReview);

//export router;
module.exports = router;