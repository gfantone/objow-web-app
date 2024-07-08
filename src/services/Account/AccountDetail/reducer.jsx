import * as types from './actionTypes';
import initialState from '../../../store/initialState';

const AccountDetail = (state = initialState.accountDetail, action) => {
  switch (action.type) {
    case types.GET_ACCOUNT_DETAIL:
      return { ...state, loading: true, hasError: false };

    case types.GET_ACCOUNT_DETAIL_SUCCESS:
      return {
        ...state,
        account: action.account,
        loading: false,
        hasError: false,
      };

    case types.GET_ACCOUNT_DETAIL_ERROR:
      return { ...state, loading: false, hasError: true };

    default:
      return state;
  }
};

export default AccountDetail;
