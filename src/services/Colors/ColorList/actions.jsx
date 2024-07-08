import * as types from './actionTypes';

export const getFreeColorList = () => {
  return {
    type: types.GET_FREE_COLOR_LIST,
  };
};

export const getColorListSuccess = (colors) => {
  return {
    type: types.GET_COLOR_LIST_SUCCESS,
    colors,
  };
};

export const getColorListError = () => {
  return {
    type: types.GET_COLOR_LIST_ERROR,
  };
};
