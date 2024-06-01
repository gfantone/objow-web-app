import { call, put, takeLatest } from 'redux-saga/effects';
import { getPeriodListSuccess, getPeriodListError } from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getPeriodList(action) {
  try {
    const { data: periods } = yield call(api.periods.list);
    yield put(getPeriodListSuccess(periods));
  } catch (e) {
    yield put(getPeriodListError());
  }
}

function* watchPeriodList() {
  yield takeLatest(types.GET_PERIOD_LIST, getPeriodList);
}

export default watchPeriodList;
