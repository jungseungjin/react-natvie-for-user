import types from '../actions/types';
const defaultState = {
  landingCheck: false,
  //   sumInfo: {
  //       frist : 0,
  //       second : 0,
  //   },
};

export default landingCheck = (state = defaultState, action) => {
  // For Debugger
  // console.log('payload:' + action.payload);

  switch (action.type) {
    case types.LANDING_CHECK:
      return {
        // ...state,
        landingCheck: !state.landingCheck,
        // sumInfo: {
        //     frist:action.payload,
        //     second:state.sumInfo.second
        // }
      };
    default:
      return state;
  }
};
