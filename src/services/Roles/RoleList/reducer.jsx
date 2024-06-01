import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let RoleList = (state = initialState.roleList, action) => {
  switch (action.type) {
    case types.GET_ROLE_LIST:
      return { ...state, roles: null, loading: true, hasError: false };

    case types.GET_ROLE_LIST_SUCCESS:
      return { ...state, roles: action.roles, loading: false, hasError: false };

    case types.GET_ROLE_LIST_ERROR:
      return { ...state, roles: null, loading: false, hasError: true };

    default:
      return state;
  }
};

export default RoleList;
