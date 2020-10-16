import {call, put, takeEvery} from 'redux-saga/effects'
import {connectAircallSuccess, connectAircallError} from './actions'
import * as errors from './errors'
import * as types from './actionTypes'
import api from '../../../data/api/api'
import local from '../../../data/local/local'
import router from '../../../data/router/router'

function* connectAircall(action) {
    try {
        const { data : url, error: urlError } = yield call(router.apiUrl.get, action.code)

        if (!urlError) {
            yield call(local.setApiUrl, url)
            const { data: tokens, error: tokenError } = yield call(api.tokens.get, action.login, action.password)

            if (!tokenError) {
                const accessToken = tokens.access
                const {data: account} = yield call(api.account.get)
                // TODO: suite...
                yield put(connectAircallSuccess())
            } else {
                yield put(connectAircallError(errors.LOGIN_ERROR))
            }
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
