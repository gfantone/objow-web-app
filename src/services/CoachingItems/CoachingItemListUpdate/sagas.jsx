import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  updateCoachingItemListSuccess,
  updateCoachingItemListError,
} from './actions';
import { getCoachingItemListSuccess } from '../CoachingItemList/actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* updateCoachingItemList(action) {
  try {
    yield all(action.items.map((item) => call(api.coachingItems.update, item)));
    const collaboratorId =
      action.items && action.items.length > 0
        ? action.items[0].collaborator
        : null;
    if (collaboratorId) {
      const { data: items } = yield call(
        api.collaborators.coachingItems,
        collaboratorId,
      );
      yield put(getCoachingItemListSuccess(items));
    }
    yield put(updateCoachingItemListSuccess());
  } catch (e) {
    yield put(updateCoachingItemListError());
  }
}

function* watchCoachingItemListUpdate() {
  yield takeLatest(types.UPDATE_COACHING_ITEM_LIST, updateCoachingItemList);
}

export default watchCoachingItemListUpdate;
