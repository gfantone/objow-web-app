import { call, put, takeLatest } from 'redux-saga/effects';
import {
  exportRewardOrderListSuccess,
  exportRewardOrderListError,
} from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* exportRewardOrderList(action) {
  try {
    const { data: file } = yield call(
      api.rewards.exportOrders,
      action.categoryId,
      action.teamId,
      action.collaboratorId,
      action.periodId,
      action.validationStart,
      action.validationEnd,
    );
    yield put(exportRewardOrderListSuccess(file));
  } catch (e) {
    yield put(exportRewardOrderListError());
  }
}

function* watchRewardOrderListExport() {
  yield takeLatest(types.EXPORT_REWARD_ORDER_LIST, exportRewardOrderList);
}

export default watchRewardOrderListExport;
