import { call, put, takeLatest } from 'redux-saga/effects';
import { importGoalListSuccess, importGoalListError } from './actions';
import { getImportGoalsLogListSuccess } from '../../ImportGoalsLogs/ImportGoalsLogList/actions';
import * as types from './actionTypes';
import * as errors from './errorTypes';
import api from '../../../data/api/api';

function* importGoalList(action) {
  try {
    yield call(api.goals.import, action.request);
    yield put(importGoalListSuccess());
  } catch (e) {
    if (e && e.response && e.response.status === 400) {
      yield put(importGoalListError(errors.BAD_REQUEST_ERROR));
    } else {
      yield put(importGoalListError(errors.UNKNOWN_ERROR));
    }
  } finally {
    const { data: logs } = yield call(api.importGoalsLogs.list);
    yield put(getImportGoalsLogListSuccess(logs));
  }
}

function* watchGoalListImport() {
  yield takeLatest(types.IMPORT_GOAL_LIST, importGoalList);
}

export default watchGoalListImport;
