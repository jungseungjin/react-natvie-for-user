import * as landingCheckAction from './landingCheckAction';
import * as editModeCheckAction from './editModeCheckAction';
import * as loginDataCheckAction from './loginDataCheckAction';
import * as loginDataIuCarCheckAction from './loginDataIuCarCheckAction';
import * as loginDataLocationCheckAction from './loginDataLocationCheckAction';
import * as loginData_idCheckAction from './loginData_idCheckAction';
const ActionCreators = Object.assign(
  {},
  landingCheckAction,
  editModeCheckAction,
  loginDataCheckAction,
  loginDataIuCarCheckAction,
  loginDataLocationCheckAction,
  loginData_idCheckAction,
);
export default ActionCreators;
