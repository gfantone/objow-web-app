import { call, put, takeLatest } from 'redux-saga/effects';
import { getCategoryDetailSuccess, getCategoryDetailError } from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getCategoryDetail(action) {
  try {
    let { data: category } = yield call(api.categories.detail, action.id);
    yield put(getCategoryDetailSuccess(category));
  } catch (e) {
    yield put(getCategoryDetailError());
  }
}

function* watchCategoryDetail() {
  yield takeLatest(types.GET_CATEGORY_DETAIL, getCategoryDetail);
}

export default watchCategoryDetail;
