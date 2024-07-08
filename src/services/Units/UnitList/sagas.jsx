import { call, put, takeLatest } from 'redux-saga/effects';
import { getUnitListSuccess, getUnitListError } from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getUnitList(action) {
  try {
    const { data: units } = yield call(api.units.list);
    yield put(getUnitListSuccess(units));
  } catch (e) {
    yield put(getUnitListError());
  }
}

function* watchUnitList() {
  yield takeLatest(types.GET_UNIT_LIST, getUnitList);
}

export default watchUnitList;
