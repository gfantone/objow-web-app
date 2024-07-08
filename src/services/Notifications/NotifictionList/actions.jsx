import * as types from './actionTypes';

export const getNotificationList = () => ({
  type: types.GET_NOTIFICATION_LIST,
});
export const getNotificationListSuccess = (notifications) => ({
  type: types.GET_NOTIFICATION_LIST_SUCCESS,
  notifications,
});

export const getNotificationListError = () => ({
  type: types.GET_NOTIFICATION_LIST_ERROR,
});
