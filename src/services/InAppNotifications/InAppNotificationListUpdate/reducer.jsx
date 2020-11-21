import * as types from './actionTypes';
import initialState from '../../../store/initialState';

const InAppNotificationListUpdate = (state = initialState.inAppNotificationListUpdate, action) => {
    switch (action.type) {
        case types.UPDATE_IN_APP_NOTIFICATION_LIST:
            return {...state, success: false, loading: true, hasError: false}

        case types.UPDATE_IN_APP_NOTIFICATION_LIST_SUCCESS:
            return {...state, success: true, loading: false, hasError: false}

        case types.UPDATE_IN_APP_NOTIFICATION_LIST_ERROR:
            return {...state, success: false, loading: false, hasError: true}

        case types.CLEAR_IN_APP_NOTIFICATION_LIST_UPDATE:
            return {...state, success: false, loading: false, hasError: true}

        default:
            return state
    }
}

export default InAppNotificationListUpdate
