import { call, put, takeLatest } from 'redux-saga/effects';
import {
  resetUserPasswordConfirmSuccess,
  resetUserPasswordConfirmError,
} from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';
import router from '../../../data/router/router';
import local from '../../../data/local/local';
import _ from 'lodash';

function* resetUserPasswordConfirm(action) {
  try {
    const environment = _.replace(_.lowerCase(action.code), ' ', '');
    yield call(local.setClientEnvironment, environment);
    yield call(api.users.resetPasswordConfirm, {
      reset_token: action.reset_token,
      password: action.password,
      force: action.force,
    });
    yield put(resetUserPasswordConfirmSuccess());
  } catch (e) {
    yield put(resetUserPasswordConfirmError(e.response.data.error));
  }
}

function* watchUserResetPasswordConfirm() {
  yield takeLatest(types.RESET_USER_PASSWORD_CONFIRM, resetUserPasswordConfirm);
}

export default watchUserResetPasswordConfirm;
