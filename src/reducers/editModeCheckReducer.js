import types from '../actions/types';
const defaultState = {
  editMode: false,
  //   sumInfo: {
  //       frist : 0,
  //       second : 0,
  //   },
};

export default editModeCheck = (state = defaultState, action) => {
  // For Debugger
  // console.log('payload:' + action.payload);
  switch (action.type) {
    case types.EDIT_MODE:
      return {
        //...state,
        //landingCheck: !state.landingCheck,
        editMode: !state.editMode,
        // sumInfo: {
        //     frist:action.payload,
        //     second:state.sumInfo.second
        // }
      };
    default:
      return state;
  }
};
