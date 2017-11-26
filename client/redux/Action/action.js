
import recipeApi from '../api/recipeApi';
import * as types from './actionType';

export function loadRecipeSuccess(recipes) {  
  return {type: 'LOAD_RECIPE_SUCCESS', recipes};
}

export function loadRecipes() {  
  return function(dispatch) {
    return recipeApi.getAllRecipes().then(recipes => {
      dispatch(loadRecipeSuccess(recipes));
    }).catch(error => {
      throw(error);
    });
  };
}

