import { call, put, takeLatest, throttle } from 'redux-saga/effects';

import { createLevelListSuccess, createLevelListError } from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* createLevelList(action) {
  try {
    yield call(api.levels.bulkCreate, action.levels);
    yield put(createLevelListSuccess());
  } catch (e) {
    yield put(createLevelListError());
  }
}

function* watchLevelListCreation() {
  yield throttle(500, types.CREATE_LEVEL_LIST, createLevelList);
}

export default watchLevelListCreation;
