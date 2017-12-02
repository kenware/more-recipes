
import * as types from '../Action/actionType';  
import initialState from './initialState';

export default (state = initialState.recipes, action) => {  
  switch(action.type) {
    case types.LOAD_RECIPE_SUCCESS:
      return action.recipes;
    case types.LOAD_ONE_RECIPE:
      return action.recipes;
    case types.GET_VOTE:
      return action.recipes;
    default: 
      return state;
  }
}