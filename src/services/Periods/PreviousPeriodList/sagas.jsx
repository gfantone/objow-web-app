import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getPreviousPeriodListSuccess,
  getPreviousPeriodListError,
} from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getPreviousPeriodList(action) {
  try {
    const { data: periods } = yield call(api.periods.previous);
    yield put(getPreviousPeriodListSuccess(periods));
  } catch (e) {
    yield put(getPreviousPeriodListError());
  }
}

function* watchPreviousPeriodList() {
  yield takeLatest(types.GET_PREVIOUS_PERIOD_LIST, getPreviousPeriodList);
}

export default watchPreviousPeriodList;
