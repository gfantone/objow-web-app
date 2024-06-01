import { call, put, takeLatest } from 'redux-saga/effects';
import { createRewardSuccess, createRewardError } from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* createReward(action) {
  try {
    yield call(api.rewards.create, action.reward);
    yield put(createRewardSuccess());
  } catch (e) {
    yield put(createRewardError());
  }
}

function* watchRewardCreation() {
  yield takeLatest(types.CREATE_REWARD, createReward);
}

export default watchRewardCreation;
