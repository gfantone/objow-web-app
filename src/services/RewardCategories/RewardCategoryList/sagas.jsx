import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getRewardCategoryListSuccess,
  getRewardCategoryListError,
} from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getActiveRewardCategoryList(action) {
  try {
    const { data: categories } = yield call(api.rewardCategories.actives);
    yield put(getRewardCategoryListSuccess(categories));
  } catch (e) {
    yield put(getRewardCategoryListError());
  }
}

function* getInactiveRewardCategoryList(action) {
  try {
    const { data: categories } = yield call(api.rewardCategories.inactives);
    yield put(getRewardCategoryListSuccess(categories));
  } catch (e) {
    yield put(getRewardCategoryListError());
  }
}

export function* watchActiveRewardCategoryList() {
  yield takeLatest(
    types.GET_ACTIVE_REWARD_CATEGORY_LIST,
    getActiveRewardCategoryList,
  );
}

export function* watchInactiveRewardCategoryList() {
  yield takeLatest(
    types.GET_INACTIVE_REWARD_CATEGORY_LIST,
    getInactiveRewardCategoryList,
  );
}
