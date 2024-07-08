import { call, put, takeLatest } from 'redux-saga/effects';
import { getBadgeIconListSuccess, getBadgeIconListError } from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getUsableList(action) {
  try {
    let { data: icons } = yield call(api.badgeIcons.usable);
    yield put(getBadgeIconListSuccess(icons));
  } catch (e) {
    yield put(getBadgeIconListError());
  }
}

function* getUsableListForBadge(action) {
  try {
    let { data: icons } = yield call(api.badges.usableIcons, action.badgeId);
    yield put(getBadgeIconListSuccess(icons));
  } catch (e) {
    yield put(getBadgeIconListError());
  }
}

export function* watchUsableBadgeIconList() {
  yield takeLatest(types.GET_USABLE_LIST, getUsableList);
}

export function* watchUsableIconListForBadge() {
  yield takeLatest(types.GET_USABLE_LIST_FOR_BADGE, getUsableListForBadge);
}
