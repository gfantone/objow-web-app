import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getTeamRewardOrderSummaryListSuccess,
  getTeamRewardOrderSummaryListError,
} from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getValidatedTeamRewardOrderSummaryList(action) {
  try {
    const { data: orders } = yield call(api.teamRewardOrderSummaries.validated);
    yield put(getTeamRewardOrderSummaryListSuccess(orders));
  } catch (e) {
    yield put(getTeamRewardOrderSummaryListError());
  }
}

function* getWaitingTeamRewardOrderSummaryList(action) {
  try {
    const { data: orders } = yield call(api.teamRewardOrderSummaries.waiting);
    yield put(getTeamRewardOrderSummaryListSuccess(orders));
  } catch (e) {
    yield put(getTeamRewardOrderSummaryListError());
  }
}

export function* watchValidatedTeamRewardOrderSummaryList() {
  yield takeLatest(
    types.GET_VALIDATED_TEAM_REWARD_ORDER_SUMMARY_LIST,
    getValidatedTeamRewardOrderSummaryList,
  );
}

export function* watchWaitingTeamRewardOrderSummaryList() {
  yield takeLatest(
    types.GET_WAITING_TEAM_REWARD_ORDER_SUMMARY_LIST,
    getWaitingTeamRewardOrderSummaryList,
  );
}
