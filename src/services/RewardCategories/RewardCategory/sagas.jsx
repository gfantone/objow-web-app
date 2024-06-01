import { call, put, takeLatest } from 'redux-saga/effects';
import { getRewardCategorySuccess, getRewardCategoryError } from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getRewardCategory(action) {
  try {
    const { data: category } = yield call(api.rewardCategories.get, action.id);
    yield put(getRewardCategorySuccess(category));
  } catch (e) {
    yield put(getRewardCategoryError());
  }
}

function* watchRewardCategory() {
  yield takeLatest(types.GET_REWARD_CATEGORY, getRewardCategory);
}

export default watchRewardCategory;
