


import * as types from '../Action/actionType';  
import initialState from './initialState';

export default (state = initialState.reviews, action) => {  
  switch(action.type) {
    case types.LOAD_ALL_REVIEWS:
      return action.reviews;
    default: 
      return state;
  }
}


