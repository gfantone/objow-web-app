import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getImportGoalsLogListSuccess,
  getImportGoalsLogListError,
} from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getImportGoalsLogList(action) {
  try {
    const { data: logs } = yield call(api.importGoalsLogs.list);

    yield put(getImportGoalsLogListSuccess(logs));
  } catch (e) {
    yield put(getImportGoalsLogListError());
  }
}

function* watchImportGoalsLogList() {
  yield takeLatest(types.GET_IMPORT_GOALS_LOG_LIST, getImportGoalsLogList);
}

export default watchImportGoalsLogList;
