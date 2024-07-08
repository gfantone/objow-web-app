import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  getInAppNotificationListSuccess,
  getInAppNotificationListError,
} from './actions';
import { countNewInAppNotificationSuccess } from '../InAppNotificationCount/actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getInAppNotificationList(action) {
  try {
    const { data: notifications } = yield call(api.inAppNotifications.list);
    yield all(
      notifications
        .filter((x) => !x.read)
        .map((notification) =>
          call(api.inAppNotifications.update, notification.id, true)
        )
    );
    yield put(countNewInAppNotificationSuccess(0));
    yield put(getInAppNotificationListSuccess(notifications));
  } catch (e) {
    yield put(getInAppNotificationListError());
  }
}

function* watchInAppNotificationList() {
  yield takeLatest(
    types.GET_IN_APP_NOTIFICATION_LIST,
    getInAppNotificationList
  );
}

export default watchInAppNotificationList;
