
import {combineReducers} from 'redux';  
import recipes from './recipeReducer';

const rootReducer = combineReducers({  
  // short hand property names
  recipes
})

export default rootReducer;