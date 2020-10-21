import {call, put, takeEvery} from 'redux-saga/effects'
import {connectAircallSuccess, connectAircallError} from './actions'
import * as errors from './errors'
import * as types from './actionTypes'
import api from '../../../data/api/api'
import local from '../../../data/local/local'
import router from '../../../data/router/router'

function* connectAircall(action) {
    try {
        const {data : url, error: urlError} = yield call(router.apiUrl.get, action.code)

        if (!urlError) {
            yield call(local.setTemporaryApiUrl, url)
            const {data: tokens, error: tokenError} = yield call(api.tokens.get, action.login, action.password)

            if (!tokenError) {
                yield call(local.setTemporaryAccessToken, tokens.access)
                yield call(local.setTemporaryRefreshToken, tokens.refresh)

                const {data: account} = yield call(api.account.get)

                if (account.role.code === 'A') {
                    try {
                        yield call(api.partners.connectAircall, action.oauthCode)
                        yield put(connectAircallSuccess())
                    }
                    catch (error) {
                        if (error && error.response && error.response.status === 408) {
                            yield put(connectAircallError(errors.EXPIRATION_ERROR))
                        } else {
                            yield put(connectAircallError(errors.UNKNOWN_ERROR))
                        }
                    }
                } else {
                    yield put(connectAircallError(errors.AUTHORIZATION_ERROR))
                }

                yield call(local.removeTemporaryAccessToken)
                yield call(local.removeTemporaryRefreshToken)
            } else {
                yield put(connectAircallError(errors.LOGIN_ERROR))
            }

            yield call(local.removeTemporaryApiUrl)
        } else {
            yield put(connectAircallError(errors.LOGIN_ERROR))
        }
    } catch(error) {
        yield put(connectAircallError(errors.UNKNOWN_ERROR))
    }
}

function* watchAircallAuthentication() {
    yield takeEvery(types.CONNECT_AIRCALL, connectAircall)
}

export default watchAircallAuthentication
