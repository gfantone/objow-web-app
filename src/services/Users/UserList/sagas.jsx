import { call, put, takeLatest } from 'redux-saga/effects';
import { getUserListSuccess, getUserListError } from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getUserList(action) {
  try {
    const { data: result } = yield call(
      api.users.list,
      action.isActive,
      action.simple,
      action.page,
      action.search,
      action.orderBy,
      action.roleCode,
      action.limit,
      action.smallPages,
      action.full
    );
    yield put(
      getUserListSuccess(result.users, result.total, result.filtered_total)
    );
  } catch (e) {
    yield put(getUserListError());
  }
}

function* watchUserList() {
  yield takeLatest(types.GET_USER_LIST, getUserList);
}

export default watchUserList;
