import { call, put, takeLatest, throttle } from 'redux-saga/effects';

import { createWeekOverlapSuccess, createWeekOverlapError } from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* createWeekOverlap(action) {
  try {
    yield call(api.weekOverlaps.create, action.weekOverlap);
    yield put(createWeekOverlapSuccess());
  } catch (e) {
    yield put(createWeekOverlapError());
  }
}

function* watchWeekOverlapCreation() {
  yield throttle(500, types.CREATE_WEEK_OVERLAP, createWeekOverlap);
}

export default watchWeekOverlapCreation;
