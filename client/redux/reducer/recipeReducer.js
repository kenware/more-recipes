
import * as types from '../Action/actionType';  
import initialState from './initialState';
export default function recipeReducer(state = initialState.recipes, action) {  
  switch(action.type) {
    case types.LOAD_RECIPE_SUCCESS:
      return action.recipes
    default: 
      return state;
  }
}