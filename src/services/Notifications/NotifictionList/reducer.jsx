import * as types from './actionTypes';
import initialState from '../../../store/initialState';

const NotificationList = (state = initialState.notificationList, action) => {
  switch (action.type) {
    case types.GET_NOTIFICATION_LIST:
      return { ...state, notifications: null, loading: true, hasError: false };

    case types.GET_NOTIFICATION_LIST_SUCCESS:
      return {
        ...state,
        notifications: action.notifications,
        loading: false,
        hasError: false,
      };

    case types.GET_NOTIFICATION_LIST_ERROR:
      return { ...state, notifications: null, loading: false, hasError: true };

    default:
      return state;
  }
};

export default NotificationList;
