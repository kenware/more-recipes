
import * as types from '../Action/actionType';  
import initialState from './initialState';

export default (state = initialState.appMessage, action) => {  
  switch(action.type) {
    case types.APP_MESSAGE:
      return action.appMessage;
    default: 
      return state;
  }
}