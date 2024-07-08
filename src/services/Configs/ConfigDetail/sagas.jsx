import { call, put, takeLatest } from 'redux-saga/effects';
import { getConfigDetailSuccess, getConfigDetailError } from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getConfigDetail(action) {
  try {
    const { data: config } = yield call(api.configs.detail, action.code);
    yield put(getConfigDetailSuccess(config));
  } catch (e) {
    yield put(getConfigDetailError());
  }
}

function* watchConfigDetail() {
  yield takeLatest(types.GET_CONFIG_DETAIL, getConfigDetail);
}

export default watchConfigDetail;
