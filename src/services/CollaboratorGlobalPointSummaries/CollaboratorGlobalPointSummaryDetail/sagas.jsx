import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getCollaboratorGlobalPointSummarySuccess,
  getCollaboratorGlobalPointSummaryError,
} from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getCollaboratorGlobalPointSummary(action) {
  try {
    var periodId = action.periodId;
    if (!periodId) {
      const { data: period } = yield call(api.periods.current);
      periodId = period.id;
    }
    const { data: summary } = yield call(
      api.periods.collaboratorGlobalPointSummary,
      periodId,
    );
    yield put(getCollaboratorGlobalPointSummarySuccess(summary));
  } catch (e) {
    yield put(getCollaboratorGlobalPointSummaryError());
  }
}

function* watchCollaboratorGlobalPointSummaryDetail() {
  yield takeLatest(
    types.GET_COLLABORATOR_GLOBAL_POINT_SUMMARY,
    getCollaboratorGlobalPointSummary,
  );
}

export default watchCollaboratorGlobalPointSummaryDetail;
