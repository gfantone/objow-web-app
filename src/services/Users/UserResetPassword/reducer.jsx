import * as types from './actionTypes';
import initialState from '../../../store/initialState';

const UserResetPassword = (state = initialState.userResetPassword, action) => {
  switch (action.type) {
    case types.RESET_USER_PASSWORD:
      return { ...state, success: false, loading: true, hasError: false };

    case types.RESET_USER_PASSWORD_SUCCESS:
      return { ...state, success: true, loading: false, hasError: false };

    case types.RESET_USER_PASSWORD_ERROR:
      return { ...state, success: false, loading: false, hasError: true };

    default:
      return state;
  }
};

export default UserResetPassword;
