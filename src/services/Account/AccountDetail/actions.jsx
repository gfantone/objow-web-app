import * as types from './actionTypes';

export const getAccountDetail = () => ({
  type: types.GET_ACCOUNT_DETAIL,
});

export const getAccountDetailSuccess = (account) => ({
  type: types.GET_ACCOUNT_DETAIL_SUCCESS,
  account,
});

export const getAccountDetailError = () => ({
  type: types.GET_ACCOUNT_DETAIL_ERROR,
});
