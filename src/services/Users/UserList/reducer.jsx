import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let UserList = (state = initialState.userList, action) => {
  switch (action.type) {
    case types.GET_USER_LIST:
      return { ...state, users: null, loading: true, hasError: false };

    case types.GET_USER_LIST_SUCCESS:
      return {
        ...state,
        users: action.users,
        total: action.total,
        filteredTotal: action.filtered_total,
        loading: false,
        hasError: false,
      };

    case types.GET_USER_LIST_ERROR:
      return { ...state, users: null, loading: false, hasError: true };

    case types.GET_USER_LIST_CLEAR:
      return { ...state, users: null, loading: false, hasError: false };

    default:
      return state;
  }
};

export default UserList;
