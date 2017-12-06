
import { combineReducers } from 'redux';  
import recipes from './recipeReducer';
import message from './errorReducer';
import reviews from './reviewReducer';
//const recipes = recipe.recipeReducer;
const rootReducer = combineReducers({  
  // short hand property names
  recipes,
  message,
  reviews
})

export default rootReducer;