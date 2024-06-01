import * as types from './actionTypes';
import initialState from '../../../store/initialState';

const SystemImageList = (state = initialState.systemImageList, action) => {
  switch (action.type) {
    case types.GET_SYSTEM_IMAGE_LIST:
      return { ...state, images: [], loading: true, hasError: false };

    case types.GET_SYSTEM_IMAGE_LIST_SUCCESS:
      return {
        ...state,
        images: action.images,
        loading: false,
        hasError: false,
      };

    case types.GET_SYSTEM_IMAGE_LIST_ERROR:
      return { ...state, images: [], loading: false, hasError: true };

    default:
      return state;
  }
};

export default SystemImageList;
