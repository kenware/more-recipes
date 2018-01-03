
import * as types from '../Action/actionType';  
import initialState from './initialState';

export default (state = initialState.users, action) => {  
  switch(action.type) {
    case types.LOAD_ALL_USERS:
      return action.users;
    default: 
      return state;
  }
}