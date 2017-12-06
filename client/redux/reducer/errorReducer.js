
import * as types from '../Action/actionType';  
import initialState from './initialState';

export default (state = initialState.message, action) => {  
  switch(action.type) {
    case types.GET_MESSAGE:
      return action.message;
    default: 
      return state;
  }
}