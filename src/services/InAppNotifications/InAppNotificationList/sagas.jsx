import {call, put, takeEvery} from 'redux-saga/effects'
import {getInAppNotificationListSuccess, getInAppNotificationListError} from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getInAppNotificationList(action) {
    try {
        const {data: notifications} = yield call(api.inAppNotifications.list)
        yield put(getInAppNotificationListSuccess(notifications))
    } catch(e) {
        yield put(getInAppNotificationListError())
    }
}

function* watchInAppNotificationList() {
    yield takeEvery(types.GET_IN_APP_NOTIFICATION_LIST, getInAppNotificationList)
}

export default watchInAppNotificationList
