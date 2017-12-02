
import * as types from './actionType';
import token from '../../midleware/auth'

export const loadRecipeSuccess = (recipes) => {  
  return {type: types.LOAD_RECIPE_SUCCESS, recipes};
}
export const loadOneRecipe = (recipes) => {  
  return {type: types.LOAD_ONE_RECIPE, recipes};
}
export const getVoteSuccess = (recipes) => {  
  return {type: types.GET_VOTE, recipes};
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
export const loadRecipe = (id) => { 
  return function(dispatch) { 
   fetch('/api/recipes/'+ id)
   .then(res => res.json())
   .then(recipes => {
     return dispatch(loadOneRecipe(recipes));
   });
   
  } 
}

export const getVotes = (id,vote) => { 
  return function(dispatch) { 
   fetch('/api/recipes/'+ id + '/'+ vote,{
    method:'PUT',
    headers:{'authorization':token()}
   })
   .then(res => res.json())
   .then(recipes => {
     return dispatch(getVoteSuccess(recipes));
   });
   
  } 
}