import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getCurrentPeriodDetailSuccess,
  getCurrentPeriodDetailError,
} from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getCurrentPeriodDetail(action) {
  try {
    const { data: period } = yield call(api.periods.current);
    yield put(getCurrentPeriodDetailSuccess(period));
  } catch (e) {
    yield put(getCurrentPeriodDetailError());
  }
}

function* watchCurrentPeriodDetail() {
  yield takeLatest(types.GET_CURRENT_PERIOD_DETAIL, getCurrentPeriodDetail);
}

export default watchCurrentPeriodDetail;
