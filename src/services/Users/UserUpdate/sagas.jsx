import { call, put, takeLatest } from 'redux-saga/effects';
import { updateUserSuccess, updateUserError } from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* updateUser(action) {
  try {
    yield call(api.users.update, action.user);
    if (action.photo) {
      yield call(api.users.update, action.user, action.photo);
    }
    yield put(updateUserSuccess());
  } catch (e) {
    yield put(updateUserError());
  }
}

function* watchUserUpdate() {
  yield takeLatest(types.UPDATE_USER, updateUser);
}

export default watchUserUpdate;
