import types from './types';

export function loginDataCheckAction(boo) {
  return {
    type: types.LOGIN_DATA,
    payload: boo,
  };
}
