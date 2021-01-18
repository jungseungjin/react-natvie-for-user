import {combineReducers} from 'redux';
import LandingCheckReducer from './landingCheckReducer';

export default combineReducers({
  landingCheck: LandingCheckReducer,
});
