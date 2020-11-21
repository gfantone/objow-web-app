import * as types from './actionTypes'

export const updateInAppNotificationList = (notifications) => ({
    type: types.UPDATE_IN_APP_NOTIFICATION_LIST,
    notifications
})

export const updateInAppNotificationListSuccess = () => ({
    type: types.UPDATE_IN_APP_NOTIFICATION_LIST_SUCCESS
})

export const updateInAppNotificationListError = () => ({
    type: types.UPDATE_IN_APP_NOTIFICATION_LIST_ERROR
})

export const clearInAppNotificationListUpdate = () => ({
    type: types.CLEAR_IN_APP_NOTIFICATION_LIST_UPDATE
})
