import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getImportUsersLogListSuccess,
  getImportUsersLogListError,
} from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getImportUsersLogList(action) {
  try {
    const { data: logs } = yield call(api.importUsersLogs.list);

    yield put(getImportUsersLogListSuccess(logs));
  } catch (e) {
    yield put(getImportUsersLogListError());
  }
}

function* watchImportUsersLogList() {
  yield takeLatest(types.GET_IMPORT_USERS_LOG_LIST, getImportUsersLogList);
}

export default watchImportUsersLogList;
