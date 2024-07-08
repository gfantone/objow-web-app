import * as types from './actionTypes';
import initialState from '../../../store/initialState';

const UserResetPasswordConfirm = (
  state = initialState.userResetPasswordConfirm,
  action,
) => {
  switch (action.type) {
    case types.RESET_USER_PASSWORD_CONFIRM:
      return { ...state, success: false, loading: true, hasError: false };

    case types.RESET_USER_PASSWORD_CONFIRM_SUCCESS:
      return { ...state, success: true, loading: false, hasError: false };

    case types.RESET_USER_PASSWORD_CONFIRM_ERROR:
      return {
        ...state,
        success: false,
        loading: false,
        hasError: true,
        error: action.error,
      };

    default:
      return state;
  }
};

export default UserResetPasswordConfirm;
