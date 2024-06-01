import * as types from './actionTypes';

export const updateNotificationList = (notifications) => {
  return {
    type: types.UPDATE_NOTIFICATION_LIST,
    notifications,
  };
};

export const updateNotificationListSuccess = () => {
  return {
    type: types.UPDATE_NOTIFICATION_LIST_SUCCESS,
  };
};

export const updateNotificationListError = () => {
  return {
    type: types.UPDATE_NOTIFICATION_LIST_ERROR,
  };
};

export const clearNotificationListUpdate = () => {
  return {
    type: types.CLEAR_NOTIFICATION_LIST_UPDATE,
  };
};
