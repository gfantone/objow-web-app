import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let UserList = (state = initialState.userIdentifierList, action) => {
  switch (action.type) {
    case types.GET_USER_IDENTIFIER_LIST:
      return { ...state, definitions: null, loading: true, hasError: false };

    case types.GET_USER_IDENTIFIER_LIST_SUCCESS:
      return {
        ...state,
        definitions: action.definitions,
        loading: false,
        hasError: false,
      };

    case types.GET_USER_IDENTIFIER_LIST_ERROR:
      return { ...state, definitions: null, loading: false, hasError: true };

    case types.GET_USER_IDENTIFIER_LIST_CLEAR:
      return { ...state, definitions: null, loading: false, hasError: false };

    default:
      return state;
  }
};

export default UserList;
