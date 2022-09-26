import { combineReducers } from 'redux';
import userReducer from './user';
import saveDrinks from './drinks';

const rootReducer = combineReducers({
  userReducer,
  saveDrinks,
});

export default rootReducer;
