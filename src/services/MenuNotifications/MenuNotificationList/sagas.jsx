import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  getMenuNotificationListSuccess,
  getMenuNotificationListError,
} from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getMenuNotificationList(action) {
  try {
    const { data: notifications } = yield call(api.menuNotifications.list);
    // yield all(notifications.filter(x => !x.read).map(notification => call(api.inAppNotifications.update, notification.id, true)))
    yield put(getMenuNotificationListSuccess(notifications));
  } catch (e) {
    yield put(getMenuNotificationListError());
  }
}

function* watchMenuNotificationList() {
  yield takeLatest(types.GET_MENU_NOTIFICATION_LIST, getMenuNotificationList);
}

export default watchMenuNotificationList;
