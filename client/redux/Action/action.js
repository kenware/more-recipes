
import * as types from './actionType';

export const loadRecipeSuccess = (recipes) => {  
  return {type: types.LOAD_RECIPE_SUCCESS, recipes};
}

export const loadRecipes = () => { 
   return function(dispatch) { 
    fetch('/api/recipes')
    .then(res => res.json())
    .then(recipes => {
      return dispatch(loadRecipeSuccess(recipes));
    });
    
   } 
}
