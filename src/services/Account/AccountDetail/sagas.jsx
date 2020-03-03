import { call, put, takeEvery } from 'redux-saga/effects'
import { getAccountDetailSuccess, getAccountDetailError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getAccountDetail(action) {
    try {
        const { data: account } = yield call(api.account.get);
        yield put(getAccountDetailSuccess(account));
    } catch(e) {
        yield put(getAccountDetailError())
    }
}

function* watchAccountDetail() {
    yield takeEvery(types.GET_ACCOUNT_DETAIL, getAccountDetail)
}

export default watchAccountDetail
