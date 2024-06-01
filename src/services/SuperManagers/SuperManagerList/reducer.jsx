import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let SuperManagerList = (state = initialState.managerList, action) => {
  switch (action.type) {
    case types.GET_FREE_SUPER_MANAGER_LIST:
      return { ...state, superManagers: null, loading: true, hasError: false };

    case types.GET_SUPER_MANAGER_LIST_SUCCESS:
      return {
        ...state,
        superManagers: action.superManagers,
        loading: false,
        hasError: false,
      };

    case types.GET_SUPER_MANAGER_LIST_ERROR:
      return { ...state, superManagers: null, loading: false, hasError: true };

    default:
      return state;
  }
};

export default SuperManagerList;
