import { call, put, takeLatest } from 'redux-saga/effects';
import { getLevelIconListSuccess, getLevelIconListError } from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getUsableList(action) {
  try {
    let { data: icons } = yield call(api.levelIcons.usable);
    yield put(getLevelIconListSuccess(icons));
  } catch (e) {
    yield put(getLevelIconListError());
  }
}

function* getUsableListForLevel(action) {
  try {
    let { data: icons } = yield call(api.levels.usableIcons, action.levelId);
    yield put(getLevelIconListSuccess(icons));
  } catch (e) {
    yield put(getLevelIconListError());
  }
}

export function* watchUsableLevelIconList() {
  yield takeLatest(types.GET_LEVELS_USABLE_LIST, getUsableList);
}

export function* watchUsableLevelIconListForLevel() {
  yield takeLatest(types.GET_USABLE_LIST_FOR_LEVEL, getUsableListForLevel);
}
