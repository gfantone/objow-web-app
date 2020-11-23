import * as types from './actionTypes';
import initialState from '../../../store/initialState';

const InAppNotificationCount = (state = initialState.inAppNotificationCount, action) => {
    switch (action.type) {
        case types.COUNT_NEW_IN_APP_NOTIFICATION:
            return {...state, loading: true, hasError: false}

        case types.COUNT_NEW_IN_APP_NOTIFICATION_SUCCESS:
            return {...state, count: action.count, loading: false, hasError: false}

        case types.COUNT_NEW_IN_APP_NOTIFICATION_ERROR:
            return {...state, loading: false, hasError: true}

        default:
            return state
    }
}

export default InAppNotificationCount
