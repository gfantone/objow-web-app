import { call, put, takeLatest } from 'redux-saga/effects';
import { createCategorySuccess, createCategoryError } from './actions';
import { getAdminReferenceData } from '../../AdminReferenceData/actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* performCategoryCreation(action) {
  try {
    let { data: category } = yield call(api.categories.create, action.category);
    yield put(getAdminReferenceData());
    yield put(createCategorySuccess(category));
  } catch (e) {
    yield put(createCategoryError());
  }
}

function* watchCateogryCreation() {
  yield takeLatest(types.CREATE_CATEGORY, performCategoryCreation);
}

export default watchCateogryCreation;
