import { call, put, takeLatest } from 'redux-saga/effects';
import { importUserListSuccess, importUserListError } from './actions';
import { getUserListSuccess } from '../UserList/actions';
import * as types from './actionTypes';
import * as errors from './errorTypes';
import api from '../../../data/api/api';

function* importUserList(action) {
  try {
    yield call(api.users.import, action.request);
    yield put(importUserListSuccess());
  } catch (e) {
    if (e && e.response && e.response.status === 400) {
      yield put(importUserListError(errors.BAD_REQUEST_ERROR));
    } else {
      yield put(importUserListError(errors.UNKNOWN_ERROR));
    }
  } finally {
    const { data: users } = yield call(api.users.list);
    yield put(getUserListSuccess(users));
  }
}

function* watchUserListImport() {
  yield takeLatest(types.IMPORT_USER_LIST, importUserList);
}

export default watchUserListImport;
