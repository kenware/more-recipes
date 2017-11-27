
import recipeApi from '../api/recipeApi';
import * as types from './actionType';

export function loadRecipeSuccess(recipes) {  
  return {type: types.LOAD_RECIPE_SUCCESS, recipes};
}

export function loadRecipes() {  
  return function(dispatch) {
    dispatch(loadRecipeSuccess([{title:'bolp', fullNmame:'girl'},{title:'bokop', fullNmame:'girl'}]));
  };
}