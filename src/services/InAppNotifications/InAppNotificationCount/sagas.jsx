import {call, put, takeLatest} from 'redux-saga/effects'
import {countNewInAppNotificationSuccess, countNewInAppNotificationError} from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* countNewInAppNotification(action) {
    try {
        const {data: count} = yield call(api.inAppNotifications.newCount)
        yield put(countNewInAppNotificationSuccess(count))
    } catch(e) {
        yield put(countNewInAppNotificationError())
    }
}

function* watchInAppNotificationCount() {
    yield takeLatest(types.COUNT_NEW_IN_APP_NOTIFICATION, countNewInAppNotification)
}

export default watchInAppNotificationCount
