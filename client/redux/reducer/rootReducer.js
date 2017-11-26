
import { combineReducers } from 'redux';  
import recipes from './recipeReducer';
//const recipes = recipe.recipeReducer;
const rootReducer = combineReducers({  
  // short hand property names
  recipes
})

export default rootReducer;