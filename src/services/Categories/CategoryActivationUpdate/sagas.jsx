import { call, put, takeLatest } from 'redux-saga/effects';
import {
  updateCategoryActivationSuccess,
  updateCategoryActivationError,
} from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* updateCategoryActivation(action) {
  try {
    yield call(api.categories.updateActivation, action.id, action.isActive);
    yield put(updateCategoryActivationSuccess());
  } catch (e) {
    yield put(updateCategoryActivationError());
  }
}

function* watchCategoryActivationUpdate() {
  yield takeLatest(types.UPDATE_CATEGORY_ACTIVATION, updateCategoryActivation);
}

export default watchCategoryActivationUpdate;
