import * as landingCheckAction from './landingCheckAction';
import * as editModeCheckAction from './editModeCheckAction';
import * as loginDataCheckAction from './loginDataCheckAction';
import * as loginDataIuCarCheckAction from './loginDataIuCarCheckAction';
import * as loginDataLocationCheckAction from './loginDataLocationCheckAction';
const ActionCreators = Object.assign(
  {},
  landingCheckAction,
  editModeCheckAction,
  loginDataCheckAction,
  loginDataIuCarCheckAction,
  loginDataLocationCheckAction,
);
export default ActionCreators;
