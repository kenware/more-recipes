
import * as types from '../Action/actionType';  
import initialState from './initialState';

export default (state = initialState.paginate, action) => {  
  switch(action.type) {
    case types.LOAD_PAGINATE:
      return action.paginate;
    default: 
      return state;
  }
}