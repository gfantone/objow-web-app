import * as types from './actionTypes';

export const updateSystemImage = (code, image) => {
  return {
    type: types.UPDATE_SYSTEM_IMAGE,
    code,
    image,
  };
};

export const updateSystemImageSuccess = () => {
  return {
    type: types.UPDATE_SYSTEM_IMAGE_SUCCESS,
  };
};

export const updateSystemImageError = () => {
  return {
    type: types.UPDATE_SYSTEM_IMAGE_ERROR,
  };
};

export const clearSystemImageUpdate = () => {
  return {
    type: types.CLEAR_SYSTEM_IMAGE_UPDATE,
  };
};
