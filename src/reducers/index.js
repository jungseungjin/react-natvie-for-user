import {combineReducers} from 'redux';
import LandingCheckReducer from './landingCheckReducer';
import EditModeCheckReducer from './editModeCheckReducer';
import LoginDataCheckReducer from './loginDataCheckReducer';
export default combineReducers({
  landingCheck: LandingCheckReducer,
  editModeCheck: EditModeCheckReducer,
  loginDataCheck: LoginDataCheckReducer,
});
