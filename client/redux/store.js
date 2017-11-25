import {createStore, applyMiddleware} from 'redux';  
import rootReducer from './reducer/rootReducer';  
import thunk from 'redux-thunk';

const configureStore = () => {  
  return createStore(
    rootReducer,
    applyMiddleware(thunk)
  );
}
export default configureStore;