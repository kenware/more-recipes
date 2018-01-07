
import * as types from './actionType';
import token from '../../midleware/auth'
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom';
import history from '../../history';

export const loadRecipeSuccess = (recipes) => {  
  return {type: types.LOAD_RECIPE_SUCCESS, recipes};
}
export const loadPaginate = (paginate) => {  
  return {type: types.LOAD_PAGINATE, paginate};
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
export const appMessage = (appMessage) => {
  return {type : types.APP_MESSAGE, appMessage}
}
export const loadMyFavorite = (favorite) => {
  return {type : types.LOAD_FAVORITE_RECIPE, favorite}
}
export const loadAllUsers = (users) => {
  return {type : types.LOAD_ALL_USERS, users}
}
export const loadOneUser = (user) => {
  return {type : types.LOAD_ONE_USER, user}
}



export const loadRecipes = (sort,order,page,limit,search) => { 
  //api/recipes/sorts/?sort=id&order=DESC
  let url;
  if(search==='none'){
     url = '/api/recipes/sorts/?sort=' + sort + '&order=' + order;
  }else{
     url = '/api/searchRecipes/?keyword='+search;
  }
   return function(dispatch) { 
    fetch(url)
    .then(res => res.json())
    .then(recipes => {
      const offset = (page-1)*limit;
      const total = offset+limit;
      //const recipe = recipes;
      const recipesSlice = recipes.slice(offset, total);
       dispatch(loadPaginate(recipesSlice));
       dispatch(loadRecipeSuccess(recipes));
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

export const users = () => { 
  return function(dispatch) { 
   fetch('/api/users')
   .then(res => res.json())
   .then(users => {
     return dispatch(loadAllUsers(users));
   });
   
  } 
}

export const user = () => { 
  return function(dispatch) { 
   fetch('/api/user',{
    headers:{'authorization':token()}
   })
   .then(res => res.json())
   .then(user => {
     return dispatch(loadOneUser(user));
   });
   
  } 
}



export const updateProfile = (payload) => { 
  return function(dispatch) { 
   fetch('/api/user/update',{
    method:'PUT',
    headers:{'authorization':token()},
    body:payload
   })
   .then(res => res.json())
   .then(user => {
    if(typeof user == 'string'){
      return dispatch(getMessage({update:user,vote:"show"}));
    }else{
     return dispatch(getMessage({update:"update successful"}));
    }
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
       return dispatch(getMessage({
         success:"successfully reviewed!",review:"show",reviews:reviews
        }));
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

export const login = (email,password) => { 
  return function(dispatch) { 
    fetch('/api/users/signin', 
    {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({email:email,password:password})
    })
    .then(res => res.json())
    .then(user => {
     if(typeof user == 'string'){
        return dispatch(getMessage({loginMessage:user}));
      }else{      
        localStorage.setItem('token',user.token);
        localStorage.setItem('username',user.username);
        localStorage.setItem('id',user.id);
        localStorage.setItem('photo',user.image);
        return history.push("dashbord")
      }
      });
   
  } 
}

export const register = (email,password,name,username) => { 
  return function(dispatch) { 
fetch('/api/users/signup', 
{
  method:'POST',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify({
    email:email,
    password:password,
    fullName:name,
    username:username
  })
})
.then(res => res.json())
.then(user => {
  if(typeof user == 'string'){
    return dispatch(getMessage({regMessage:user}));
  }else{
    return history.push("/login");
    }
  });

} 
}

export const creatRecipe = (payload) => { 
  let data = JSON.stringify({title:'payload',
  content:'content',ingredients:'ingredients'})
  return function(dispatch) { 
    fetch('/api/recipes', 
    {
      method:'POST',
      headers:{
        'authorization':token(),
        'Accept': 'application/json',
      },
      body:payload
    })
    .then(res => res.json())
    .then(recipes => {
      if(typeof recipes == 'string'){
        return dispatch(getMessage({createRecipeError:recipes,recipe:"show"}));
      }else{
       return dispatch(getMessage({
         createRecipeSuccess:"recipe successfully created!",recipe:"show"
        }));
      }
    }
      );
   
  } 
}

export const loadMyRecipes = () => { 
  return function(dispatch) { 
   fetch('/api/recipes/userRecipes', {
    headers:{
      'authorization':token(),
      'Accept': 'application/json',
    }
  })
   .then(res => res.json())
   .then(recipes => {
    if(typeof recipes == 'string'){
      return dispatch(loadRecipeSuccess([{error:recipes,content:"You have not added any recipes",show:"show"}]));
    }else{
      return dispatch(loadRecipeSuccess(recipes));
    }
     
   });
   
  } 
}
export const loadMyFavoriteRecipes = () => { 
  return function(dispatch) { 
   fetch('/api/users/favoriteRecipes', {
    headers:{
      'authorization':token(),
      'Accept': 'application/json',
    }
  })
   .then(res => res.json())
   .then(recipes => {
    if(typeof recipes == 'string'){
      return dispatch(loadMyFavorite([{content:"You have not added any favorite recipe"}]));
    }else{
      return dispatch(loadMyFavorite(recipes));
    }
     
   });
   
  } 
}

export const deleteRecipe = (id) => { 
  return function(dispatch) { 
   fetch('/api/recipes/'+ id,
   {
    method:'DELETE',
    headers:{
      'authorization':token(),
      'Accept': 'application/json',
    }
  })
   .then(res => res.json())
   .then(recipes => {
    if(typeof recipes == 'string'){
      return dispatch(getMessage({deleteMessage:recipes,show:"show"}));
    }else{
     dispatch(appMessage(recipes));
     history.push('/dashbord')
    }
     
   });
   
  } 
}
export const updateRecipe = (payload,id) => { 
  return function(dispatch) { 
   fetch('/api/recipes/'+ id,
   {
    method:'PUT',
    headers:{
      'authorization':token(),
      'Accept': 'application/json',
    },
    body:payload

  })
   .then(res => res.json())
   .then(recipes => {
    if(typeof recipes == 'string'){
      return dispatch(getMessage({updateMessage:recipes,show:"show"}));
    }else{
      return dispatch(getMessage({updateSuccess:"Recipe successfuly updated",show:"show"}));
    }
     
   });
   
  } 
}

export const auth = () => { 
  return function(dispatch) {
   if(token()==null){
     dispatch(appMessage({appMessage:"Please login!"}));
     return history.push("/login")
   } 
   fetch('/api/refresh',{
    headers:{'authorization':token()}
   })
   .then(res => res.json())
   .then(auth => {
    if(typeof auth == 'string'){
       dispatch(appMessage({appMessage:auth}));
       return history.push("/login")
    }
   });
   
  } 
}
