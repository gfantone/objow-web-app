import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  updateNotificationListError,
  updateNotificationListSuccess,
} from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* updateNotificationList(action) {
  try {
    yield all(
      action.notifications.map((notification) =>
        call(api.notifications.update, notification.id, notification.value)
      )
    );
    yield put(updateNotificationListSuccess());
  } catch (e) {
    console.log(e);
    yield put(updateNotificationListError());
  }
}

function* watchNotificationListUpdate() {
  yield takeLatest(types.UPDATE_NOTIFICATION_LIST, updateNotificationList);
}

export default watchNotificationListUpdate;
