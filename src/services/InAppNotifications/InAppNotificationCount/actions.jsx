import * as types from './actionTypes';

export const countNewInAppNotification = () => ({
  type: types.COUNT_NEW_IN_APP_NOTIFICATION,
});

export const countNewInAppNotificationSuccess = (count) => ({
  type: types.COUNT_NEW_IN_APP_NOTIFICATION_SUCCESS,
  count,
});

export const countNewInAppNotificationError = () => ({
  type: types.COUNT_NEW_IN_APP_NOTIFICATION_ERROR,
});
