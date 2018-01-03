
import { combineReducers } from 'redux';  
import recipes from './recipeReducer';
import message from './errorReducer';
import reviews from './reviewReducer';
import paginate from './paginate';
import appMessage from './appMessage';
import favorite from './favorite';
import users from './userReducer';
import user from './oneUser';
const rootReducer = combineReducers({  
  // short hand property names
  recipes,
  message,
  reviews,
  paginate,
  appMessage,
  favorite,
  users,
  user
})

export default rootReducer;