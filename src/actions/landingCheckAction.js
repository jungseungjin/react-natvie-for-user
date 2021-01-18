import types from './types';

export function updateLandingCheck(boo) {
  return {
    type: types.LANDING_CHECK,
    payload: boo,
  };
}
