import { call, put, takeLatest } from 'redux-saga/effects';
import { createBadgeSuccess, createBadgeError } from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* createBadge(action) {
  try {
    yield call(api.badges.create, action.badge);
    yield put(createBadgeSuccess());
  } catch (e) {
    yield put(createBadgeError());
  }
}

function* watchBadgeUpdate() {
  yield takeLatest(types.CREATE_BADGE, createBadge);
}

export default watchBadgeUpdate;
