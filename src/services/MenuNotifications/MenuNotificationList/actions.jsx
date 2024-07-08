import * as types from './actionTypes';

export const getMenuNotificationList = () => ({
  type: types.GET_MENU_NOTIFICATION_LIST,
});

export const getMenuNotificationListSuccess = (notifications) => ({
  type: types.GET_MENU_NOTIFICATION_LIST_SUCCESS,
  notifications,
});

export const getMenuNotificationListError = () => ({
  type: types.GET_MENU_NOTIFICATION_LIST_ERROR,
});
