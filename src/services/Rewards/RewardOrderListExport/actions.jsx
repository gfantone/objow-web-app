import * as types from './actionTypes';

export const exportRewardOrderList = (
  categoryId,
  teamId,
  collaboratorId,
  periodId,
  validationStart,
  validationEnd,
) => ({
  type: types.EXPORT_REWARD_ORDER_LIST,
  categoryId,
  teamId,
  collaboratorId,
  periodId,
  validationStart,
  validationEnd,
});

export const exportRewardOrderListSuccess = (file) => ({
  type: types.EXPORT_REWARD_ORDER_LIST_SUCCESS,
  file,
});

export const exportRewardOrderListError = () => ({
  type: types.EXPORT_REWARD_ORDER_LIST_ERROR,
});

export const clearRewardOrderListExport = () => ({
  type: types.CLEAR_REWARD_ORDER_LIST_EXPORT,
});
