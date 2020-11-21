import {all, call, put, takeEvery} from 'redux-saga/effects'
import {updateInAppNotificationListSuccess, updateInAppNotificationListError} from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* updateInAppNotificationList(action) {
    try {
        yield all(action.notifications.map(notification => call(api.inAppNotifications.update, notification.id, notification.read)))
        yield put(updateInAppNotificationListSuccess())
    } catch(e) {
        yield put(updateInAppNotificationListError())
    }
}

function* watchInAppNotificationListUpdate() {
    yield takeEvery(types.UPDATE_IN_APP_NOTIFICATION_LIST, updateInAppNotificationList)
}

export default watchInAppNotificationListUpdate
