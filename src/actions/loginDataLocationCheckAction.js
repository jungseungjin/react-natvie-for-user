import types from './types';

export function loginDataLocationCheckAction(Object) {
  return {
    type: types.LOGIN_DATA_LOCATION,
    payload: Object,
  };
}
