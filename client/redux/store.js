import {createStore, applyMiddleware} from 'redux';  
import rootReducer from './reducer/rootReducer';  
import thunk from 'redux-thunk';
//import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

export default function configureStore() {
  return createStore(
    rootReducer,
    applyMiddleware(thunk)
  );
}