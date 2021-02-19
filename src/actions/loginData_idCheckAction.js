import types from './types';

export function loginData_idCheckAction(Array) {
  return {
    type: types.LOGIN_DATA_ID,
    payload: Array,
  };
}
