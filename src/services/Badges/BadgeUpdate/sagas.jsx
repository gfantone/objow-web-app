import { call, put, takeLatest } from 'redux-saga/effects';
import { updateBadgeSuccess, updateBadgeError } from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* updateBadge(action) {
  try {
    yield call(api.badges.update, action.id, action.badge);
    yield put(updateBadgeSuccess());
  } catch (e) {
    yield put(updateBadgeError());
  }
}

function* watchBadgeUpdate() {
  yield takeLatest(types.UPDATE_BADGE, updateBadge);
}

export default watchBadgeUpdate;
