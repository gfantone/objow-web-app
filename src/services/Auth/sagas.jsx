import { call, put, takeLatest } from 'redux-saga/effects';
import { loginSuccess, loginError } from './actions';
import { getAdminReferenceData } from '../AdminReferenceData/actions';
import { getConfigList } from '../Configs/ConfigList/actions';
import { getAccountDetailSuccess } from '../Account/AccountDetail/actions';
import { getSystemImageListSuccess } from '../SystemImages/SystemImageList/actions';
import * as errors from './errors';
import * as types from './actionTypes';
import router from '../../data/router/router';
import api from '../../data/api/api';
import local from '../../data/local/local';
import _ from 'lodash';

function* authenticate(action) {
  try {
    let tokens;
    // SSO login
    if (action.token) {
      tokens = action.token;
      // Credentials login
    } else {
      // const { data: environment, error: urlError } = yield call(
      //   router.apiUrl.get,
      //   action.code
      // );
      const environment = _.replace(_.lowerCase(action.code), ' ', '');
      yield call(local.setClientEnvironment, environment);
      const { data, error: tokenError } = yield call(
        api.tokens.get,
        action.login,
        action.password,
        action.captcha
      );
      if (
        _.get(tokenError, 'response.data.detail') ===
        'connection_attempts_exceeded'
      ) {
        return yield put(loginError(tokenError.response.data.detail));
      }
      if (!tokenError) {
        tokens = data;
      }
    }

    if (tokens) {
      yield call(local.setAccessToken, tokens.access);
      yield call(local.setRefreshToken, tokens.refresh);
      yield call(api.users.saveConnection);
      const { data: account } = yield call(api.account.get);
      const { data: images } = yield call(api.systemImages.list);
      yield put(getAdminReferenceData());
      // yield put(getConfigList());
      yield put(getAccountDetailSuccess(account));
      yield put(loginSuccess());
      yield put(getSystemImageListSuccess(images));
    } else {
      yield put(loginError(errors.LOGIN_ERROR));
    }
  } catch (error) {
    yield put(loginError(errors.UNKNOWN_ERROR));
  }
}

function* watchAuth() {
  yield takeLatest(types.LOGIN, authenticate);
}

export default watchAuth;
