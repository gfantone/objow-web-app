import * as types from './actionTypes';

export const getInAppNotificationList = () => ({
  type: types.GET_IN_APP_NOTIFICATION_LIST,
});

export const getInAppNotificationListSuccess = (notifications) => ({
  type: types.GET_IN_APP_NOTIFICATION_LIST_SUCCESS,
  notifications,
});

export const getInAppNotificationListError = () => ({
  type: types.GET_IN_APP_NOTIFICATION_LIST_ERROR,
});
