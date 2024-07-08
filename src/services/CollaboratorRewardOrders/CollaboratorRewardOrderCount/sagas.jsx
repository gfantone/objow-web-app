import { call, put, takeLatest } from 'redux-saga/effects';
import {
  countCollaboratorRewardOrderSuccess,
  countCollaboratorRewardOrderError,
} from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* countWaitingCollaboratorRewardOrder(action) {
  try {
    const { data: orders } = yield call(
      api.collaboratorRewardOrders.waitingCount,
    );
    yield put(countCollaboratorRewardOrderSuccess(orders));
  } catch (e) {
    yield put(countCollaboratorRewardOrderError());
  }
}

function* watchWaitingCollaboratorRewardOrderCount() {
  yield takeLatest(
    types.COUNT_WAITING_COLLABORATOR_REWARD_ORDER,
    countWaitingCollaboratorRewardOrder,
  );
}

export default watchWaitingCollaboratorRewardOrderCount;
