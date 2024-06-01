import { call, put, takeLatest } from 'redux-saga/effects';
import { deleteWeekOverlapSuccess, deleteWeekOverlapError } from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* deleteWeekOverlap(action) {
  try {
    yield call(api.weekOverlaps.delete, action.weekOverlapId);
    yield put(deleteWeekOverlapSuccess());
  } catch (e) {
    yield put(deleteWeekOverlapError());
  }
}

function* watchWeekOverlapDelete() {
  yield takeLatest(types.DELETE_WEEK_OVERLAP, deleteWeekOverlap);
}

export default watchWeekOverlapDelete;
