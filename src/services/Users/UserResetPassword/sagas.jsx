import { call, put, takeLatest } from 'redux-saga/effects';
import { resetUserPasswordSuccess, resetUserPasswordError } from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';
import router from '../../../data/router/router';
import local from '../../../data/local/local';
import _ from 'lodash';

function* resetUserPassword(action) {
  try {
    const environment = _.replace(_.lowerCase(action.code), ' ', '');
    yield call(local.setClientEnvironment, environment);
    const result = yield call(api.users.resetPassword, {
      email: action.email,
    });

    yield put(resetUserPasswordSuccess());
  } catch (e) {
    yield put(resetUserPasswordError());
  }
}

function* watchUserResetPassword() {
  yield takeLatest(types.RESET_USER_PASSWORD, resetUserPassword);
}

export default watchUserResetPassword;
