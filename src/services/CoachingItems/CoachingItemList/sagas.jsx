import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getCoachingItemListSuccess,
  getCoachingItemListError,
} from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getCoachingItemList(action) {
  try {
    const { data: items } = yield call(
      api.collaborators.coachingItems,
      action.collaboratorId,
    );
    yield put(getCoachingItemListSuccess(items));
  } catch (e) {
    yield put(getCoachingItemListError());
  }
}

function* watchCoachingItemList() {
  yield takeLatest(types.GET_COACHING_ITEM_LIST, getCoachingItemList);
}

export default watchCoachingItemList;
