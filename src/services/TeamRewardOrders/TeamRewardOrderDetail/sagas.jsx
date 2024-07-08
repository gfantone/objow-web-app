import { all, call, put, takeLatest } from 'redux-saga/effects';
import { getTeamRewardOrderSuccess, getTeamRewardOrderError } from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getTeamRewardOrder(action) {
  try {
    var [{ data: order }, { data: items }] = yield all([
      call(api.teamRewardOrders.detail, action.id),
      call(api.teamRewardOrders.items, action.id),
    ]);
    if (action.withPointSummary) {
      const { data: pointSummary } = yield call(
        api.teams.teamPointSummary,
        order.counter.team.id,
        order.counter.period.id,
      );
      order.pointSummary = pointSummary;
    }
    order.items = items;
    yield put(getTeamRewardOrderSuccess(order));
  } catch (e) {
    yield put(getTeamRewardOrderError());
  }
}

function* watchTeamRewardOrderDetail() {
  yield takeLatest(types.GET_TEAM_REWARD_ORDER, getTeamRewardOrder);
}

export default watchTeamRewardOrderDetail;
