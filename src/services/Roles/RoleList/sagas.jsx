import { call, put, takeLatest } from 'redux-saga/effects';
import { getRoleListSuccess, getRoleListError } from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getRoleList(action) {
  try {
    const { data: roles } = yield call(api.roles.list);
    yield put(getRoleListSuccess(roles));
  } catch (e) {
    yield put(getRoleListError());
  }
}

function* watchRoleList() {
  yield takeLatest(types.GET_ROLE_LIST, getRoleList);
}

export default watchRoleList;
