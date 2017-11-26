
import * as types from '../Action/actionType';  
import initialState from './initialState';
let initial = {
  recipes: [ ],
}
export default (state = initialState.recipes, action) => {  
  switch(action.type) {
    case 'LOAD_RECIPE_SUCCESS':
      return action.recipes;
    default: 
      return state;
  }
}