import { call, put, takeLatest } from 'redux-saga/effects';
import { updateUserPasswordSuccess, updateUserPasswordError } from './actions';
import * as types from './actionTypes';
import { getAccountDetailSuccess } from '../../Account/AccountDetail/actions';
import api from '../../../data/api/api';

function* updateUserPassword(action) {
  try {
    yield call(api.users.updatePassword, action.id, action.password);
    const { data: account } = yield call(api.account.get);

    yield put(updateUserPasswordSuccess());
    if (!action.disableRedirect) {
      yield put(getAccountDetailSuccess(account));
    }
  } catch (e) {
    yield put(updateUserPasswordError());
  }
}

function* watchUserUpdatePassword() {
  yield takeLatest(types.UPDATE_USER_PASSWORD, updateUserPassword);
}

export default watchUserUpdatePassword;
