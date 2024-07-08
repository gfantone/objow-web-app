import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let UserListImport = (state = initialState.userListImport, action) => {
  switch (action.type) {
    case types.IMPORT_USER_LIST:
      return { ...state, success: false, loading: true, error: null };

    case types.IMPORT_USER_LIST_SUCCESS:
      return { ...state, success: true, loading: false, error: null };

    case types.IMPORT_USER_LIST_ERROR:
      return { ...state, success: false, loading: false, error: action.error };

    case types.CLEAR_USER_LIST_IMPORT:
      return { ...state, success: false, loading: false, error: null };

    default:
      return state;
  }
};

export default UserListImport;
