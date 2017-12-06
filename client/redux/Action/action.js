
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

export const getMessage = (message) => {  
  return {type: types.GET_MESSAGE, message};
}
export const loadAllReviews = (reviews) => {
  return {type : types.LOAD_ALL_REVIEWS, reviews}
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
    if(typeof recipes == 'string'){
      return dispatch(getMessage({voteError:recipes,vote:"show"}));
    }else{
     return dispatch(getVoteSuccess(recipes));
    }
   });
   
  } 
}

export const sendReview = (id,title,message) => { 
  return function(dispatch) { 
    fetch('/api/recipes/' + id + '/reviews', 
    {
      method:'POST',
      headers:{
        'authorization':token(),
        'Content-Type':'multipart/form-data',
        'Content-Type':'application/json',
        'Content-Length':'[actual-content-length]'
      },
      body:JSON.stringify({title:title,reviews:message})
    })
    .then(res => res.json())
    .then(reviews => {
      if(typeof reviews == 'string'){
        return dispatch(getMessage({error:reviews,review:"show"}));
      }else{
       return dispatch(getMessage({success:"successfully reviewed!",review:"show"}));
      }
    }
      );
   
  } 
}

export const getAllReviews = (id) => { 
  return function(dispatch) { 
   fetch('/api/recipes/'+ id + '/getReviews')
   .then(res => res.json())
   .then(reviews => {
     return dispatch(loadAllReviews(reviews));
   });
   
  } 
}