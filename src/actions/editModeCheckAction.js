import types from './types';

export function editModeCheck(boo) {
  return {
    type: types.EDIT_MODE,
    payload: boo,
  };
}
