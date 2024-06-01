import { call, put, takeLatest } from 'redux-saga/effects';
import { updateCoachingItemSuccess, updateCoachingItemError } from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* updateCoachingItem(action) {
  try {
    yield call(api.coachingItems.updateState, action.id, action.state);
    yield put(updateCoachingItemSuccess());
  } catch (e) {
    yield put(updateCoachingItemError());
  }
}

function* watchCoachingItemUpdate() {
  yield takeLatest(types.UPDATE_COACHING_ITEM, updateCoachingItem);
}

export default watchCoachingItemUpdate;
