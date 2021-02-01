import {combineReducers} from 'redux';
import LandingCheckReducer from './landingCheckReducer';
import EditModeCheckReducer from './editModeCheckReducer';
export default combineReducers({
  landingCheck: LandingCheckReducer,
  editModeCheck: EditModeCheckReducer,
});
