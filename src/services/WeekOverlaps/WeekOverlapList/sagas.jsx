import { all, call, put, takeLatest } from 'redux-saga/effects';
import { getWeekOverlapListSuccess, getWeekOverlapListError } from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getWeekOverlapList(action) {
  try {
    var { data: weekOverlaps } = yield call(api.weekOverlaps.list);
    yield put(getWeekOverlapListSuccess(weekOverlaps));
  } catch (e) {
    yield put(getWeekOverlapListError());
  }
}

function* watchWeekOverlapList() {
  yield takeLatest(types.GET_WEEK_OVERLAP_LIST, getWeekOverlapList);
}

export default watchWeekOverlapList;
