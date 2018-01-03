import * as types from '../Action/actionType';  
import initialState from './initialState';

export default (state = initialState.favorite, action) => {  
  switch(action.type) {
    case types.LOAD_FAVORITE_RECIPE:
      return action.favorite;
    default: 
      return state;
  }
}