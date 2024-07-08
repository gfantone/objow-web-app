import * as types from './actionTypes';

export const getSystemImageList = () => {
  return {
    type: types.GET_SYSTEM_IMAGE_LIST,
  };
};

export const getSystemImageListSuccess = (images) => {
  return {
    type: types.GET_SYSTEM_IMAGE_LIST_SUCCESS,
    images,
  };
};

export const getSystemImageListError = () => {
  return {
    type: types.GET_SYSTEM_IMAGE_LIST_ERROR,
  };
};
