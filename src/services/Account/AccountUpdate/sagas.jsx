import { call, put, takeEvery } from 'redux-saga/effects'
import { updateAccountSuccess, updateAccountError } from './actions'
import * as types from './actionTypes'
import { loginSuccess } from '../../Auth/actions'
import api from '../../../data/api/api'

function* getAccountUpdate(action) {
    try {
        yield call(api.account.update, action.account)
        const { data: account } = yield call(api.account.get)
        yield put(updateAccountSuccess())
        yield put(loginSuccess(account))
    } catch(e) {
        yield put(updateAccountError())
    }
}

function* watchAccountUpdate() {
    yield takeEvery(types.UPDATE_ACCOUNT, getAccountUpdate)
}

export default watchAccountUpdate