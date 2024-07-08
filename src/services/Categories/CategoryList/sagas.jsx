import { call, put, takeLatest } from 'redux-saga/effects';
import { getCategoryListSuccess, getCategoryListError } from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getActiveCategoryList(action) {
  try {
    let { data: categories } = yield call(api.categories.active);
    yield put(getCategoryListSuccess(categories));
  } catch (e) {
    yield put(getCategoryListError());
  }
}

function* getInactiveCategoryList(action) {
  try {
    let { data: categories } = yield call(api.categories.inactive);
    yield put(getCategoryListSuccess(categories));
  } catch (e) {
    yield put(getCategoryListError());
  }
}

export function* watchActiveCategoryList() {
  yield takeLatest(types.GET_ACTIVE_CATEGORY_LIST, getActiveCategoryList);
}

export function* watchInactiveCategoryList() {
  yield takeLatest(types.GET_INACTIVE_CATEGORY_LIST, getInactiveCategoryList);
}
