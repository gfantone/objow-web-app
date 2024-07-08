import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getSuperManagerListSuccess,
  getSuperManagerListError,
} from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getFreeSuperManagerList(action) {
  try {
    const { data: superManagers } = yield call(api.superManagers.free);
    yield put(getSuperManagerListSuccess(superManagers));
  } catch (e) {
    yield put(getSuperManagerListError());
  }
}

function* watchFreeSuperManagerList() {
  yield takeLatest(types.GET_FREE_SUPER_MANAGER_LIST, getFreeSuperManagerList);
}

export default watchFreeSuperManagerList;
