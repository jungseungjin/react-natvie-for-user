import types from '../actions/types';
const defaultState = {
  login: {
    login: false,
    iu_car: [],
    location: {},
    _id: '',
  },
  //landingCheck: false,
  //   sumInfo: {
  //       frist : 0,
  //       second : 0,
  //   },
};

export default loginDataCheck = (state = defaultState, action) => {
  // For Debugger
  // console.log('payload:' + action.payload);

  switch (action.type) {
    case types.LOGIN_DATA:
      return {
        //...state,
        login: {
          login: action.payload,
          iu_car: state.login.iu_car,
          location: state.login.location,
          _id: state.login._id,
        },
      };
    case types.LOGIN_DATA_IU_CAR:
      return {
        login: {
          login: state.login.login,
          iu_car: action.payload,
          location: state.login.location,
          _id: state.login._id,
        },
      };
    case types.LOGIN_DATA_LOCATION:
      return {
        login: {
          login: state.login.login,
          iu_car: state.login.iu_car,
          location: action.payload,
          _id: state.login._id,
        },
      };
    case types.LOGIN_DATA_ID:
      return {
        login: {
          login: state.login.login,
          iu_car: state.login.iu_car,
          location: state.login.location,
          _id: action.payload,
        },
      };
    default:
      return state;
  }
};
