import * as types from './actionTypes';

export const updateConfig = (code, value) => {
  return {
    type: types.UPDATE_CONFIG,
    code,
    value,
  };
};

export const updateConfigSuccess = () => {
  return {
    type: types.UPDATE_CONFIG_SUCCESS,
  };
};

export const updateConfigError = () => {
  return {
    type: types.UPDATE_CONFIG_ERROR,
  };
};

export const clearConfigUpdate = () => {
  return {
    type: types.CLEAR_CONFIG_UPDATE,
  };
};
