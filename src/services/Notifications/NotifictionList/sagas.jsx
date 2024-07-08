import { call, put, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';

import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getNotificationList() {
  try {
    const { data: notifications } = yield call(api.notifications.list);
    yield put(actions.getNotificationListSuccess(notifications));
  } catch (error) {
    yield put(actions.getNotificationListError());
  }
}

function* watchNotificationList() {
  yield takeLatest(types.GET_NOTIFICATION_LIST, getNotificationList);
}

export default watchNotificationList;
