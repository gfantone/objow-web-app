import { call, put, takeEvery } from 'redux-saga/effects'
import { loginSuccess, loginError } from './actions'
import { getAdminReferenceData } from '../AdminReferenceData/actions'
import { getConfigList } from '../Configs/ConfigList/actions'
import { getAccountDetailSuccess } from '../Account/AccountDetail/actions'
import { getSystemImageListSuccess } from '../SystemImages/SystemImageList/actions'
import * as errors from './errors'
import * as types from './actionTypes'
import router from '../../data/router/router'
import api from '../../data/api/api'
import local from '../../data/local/local'

function* authenticate(action) {
    try {
        let tokens;
        if(action.token) {
          tokens = action.token
        } else {
          const {data : url, error: urlError} = yield call(router.apiUrl.get, action.code)
          if (!urlError) {
            yield call(local.setTemporaryApiUrl, url)
            const {data, error: tokenError} = yield call(api.tokens.get, action.login, action.password)
            if(!tokenError) {
              tokens = data;
            }
          }
        }

        if(tokens){
          yield call(local.setAccessToken, tokens.access);
          yield call(local.setRefreshToken, tokens.refresh);
          yield call(api.users.saveConnection);
          const { data: account } = yield call(api.account.get);
          const { data: images } = yield call(api.systemImages.list);
          yield put(getAdminReferenceData());
          yield put(getConfigList());
          yield put(getAccountDetailSuccess(account));
          yield put(loginSuccess());
          yield put(getSystemImageListSuccess(images));
          if (window.ReactNativeWebView) {
            setTimeout(function () {
              const message = {source: 'firetiger', action: 'setExternalUserId', id: account.identifier};
              window.ReactNativeWebView.postMessage(JSON.stringify(message))
            }, 1)
          }
        } else {
          yield put(loginError(errors.LOGIN_ERROR))
        }
    } catch(error) {
        yield put(loginError(errors.UNKNOWN_ERROR))
    }
}

function* watchAuth() {
    yield takeEvery(types.LOGIN, authenticate)
}

export default watchAuth
