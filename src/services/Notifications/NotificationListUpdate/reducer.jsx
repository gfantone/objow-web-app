import initialState from '../../../store/initialState';
import * as types from './actionTypes';

const NotificationListUpdate = (
  state = initialState.notificationListUpdate,
  action
) => {
  switch (action.type) {
    case types.UPDATE_NOTIFICATION_LIST:
      return { ...state, success: false, loading: true, hasError: false };

    case types.UPDATE_NOTIFICATION_LIST_SUCCESS:
      return { ...state, success: true, loading: false, hasError: false };

    case types.UPDATE_NOTIFICATION_LIST_ERROR:
      return { ...state, success: false, loading: false, hasError: true };

    case types.CLEAR_NOTIFICATION_LIST_UPDATE:
      return { ...state, success: false, loading: false, hasError: false };

    default:
      return state;
  }
};

export default NotificationListUpdate;
