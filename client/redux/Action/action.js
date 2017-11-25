
import recipeApi from '../api/recipeApi';
import * as types from './actionType';

export function loadRecipes() {  
  return function(dispatch) {
    return recipeApi.getAllRecipes().then(recipes => {
      dispatch(loadRecipeSuccess(recipes));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadRecipeSuccess(recipes) {  
    return {type: types.LOAD_RECIPE_SUCCESS, recipes};
  }