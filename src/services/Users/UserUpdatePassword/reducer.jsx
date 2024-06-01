import * as types from './actionTypes';
import initialState from '../../../store/initialState';

const UserUpdatePassword = (
  state = initialState.userUpdatePassword,
  action,
) => {
  switch (action.type) {
    case types.UPDATE_USER_PASSWORD:
      return { ...state, success: false, loading: true, hasError: false };

    case types.UPDATE_USER_PASSWORD_SUCCESS:
      return { ...state, success: true, loading: false, hasError: false };

    case types.UPDATE_USER_PASSWORD_ERROR:
      return { ...state, success: false, loading: false, hasError: true };

    case types.UPDATE_USER_PASSWORD_CLEAR:
      return { ...state, success: false, loading: false, error: null };

    default:
      return state;
  }
};

export default UserUpdatePassword;
