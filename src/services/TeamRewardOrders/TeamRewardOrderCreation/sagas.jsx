import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  createTeamRewardOrderSuccess,
  createTeamRewardOrderError,
} from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* createTeamRewardOrder(action) {
  try {
    const { data: order } = yield call(
      api.teamRewardOrders.create,
      action.order,
    );
    action.items.map((item) => (item.order = order.id));
    yield all(
      action.items.map((item) => call(api.teamRewardOrderItems.create, item)),
    );
    yield put(createTeamRewardOrderSuccess());
  } catch (e) {
    yield put(createTeamRewardOrderError());
  }
}

function* watchTeamRewardOrderCreation() {
  yield takeLatest(types.CREATE_TEAM_REWARD_ORDER, createTeamRewardOrder);
}

export default watchTeamRewardOrderCreation;
