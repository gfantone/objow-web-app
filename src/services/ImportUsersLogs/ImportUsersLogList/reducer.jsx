import * as types from './actionTypes';
import initialState from '../../../store/initialState';

const ImportUsersLogList = (
  state = initialState.importUsersLogList,
  action,
) => {
  switch (action.type) {
    case types.GET_IMPORT_USERS_LOG_LIST:
      return { ...state, logs: null, loading: true, hasError: false };

    case types.GET_IMPORT_USERS_LOG_LIST_SUCCESS:
      return { ...state, logs: action.logs, loading: false, hasError: false };

    case types.GET_IMPORT_USERS_LOG_LIST_ERROR:
      return { ...state, logs: null, loading: false, hasError: true };

    default:
      return state;
  }
};

export default ImportUsersLogList;
