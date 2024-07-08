import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let ManagerList = (state = initialState.managerList, action) => {
  switch (action.type) {
    case types.GET_FREE_MANAGER_LIST:
      return { ...state, managers: null, loading: true, hasError: false };

    case types.GET_MANAGER_LIST_SUCCESS:
      return {
        ...state,
        managers: action.managers,
        loading: false,
        hasError: false,
      };

    case types.GET_MANAGER_LIST_ERROR:
      return { ...state, managers: null, loading: false, hasError: true };

    default:
      return state;
  }
};

export default ManagerList;
