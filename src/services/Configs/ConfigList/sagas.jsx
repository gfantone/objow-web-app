import { call, put, takeLatest } from 'redux-saga/effects';
import { getConfigListSuccess, getConfigListError } from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getConfigList(action) {
  try {
    const { data: configs } = yield call(api.periods.configs, action.periodId);

    yield put(getConfigListSuccess(configs));
  } catch (e) {
    yield put(getConfigListError());
  }
}

function* getPermanentConfigList(action) {
  try {
    const { data: configs } = yield call(api.configs.permanent);
    yield put(getConfigListSuccess(configs));
  } catch (e) {
    yield put(getConfigListError());
  }
}

export function* watchConfigList() {
  yield takeLatest(types.GET_CONFIG_LIST, getConfigList);
}

export function* watchPermanentConfigList() {
  yield takeLatest(types.GET_PERMANENT_CONFIG_LIST, getPermanentConfigList);
}
