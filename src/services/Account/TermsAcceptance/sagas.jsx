import { call, put, takeEvery } from 'redux-saga/effects'
import { acceptTermsSuccess, acceptTermsError } from './actions'
import * as types from './actionTypes'
import { loginSuccess } from '../../Auth/actions'
import api from '../../../data/api/api'

function* acceptTerms(action) {
    try {
        yield call(api.account.acceptTerms, action.useTermsAccepted, action.privacyPolicyAccepted);
        const { data: account } = yield call(api.account.get);
        yield put(acceptTermsSuccess());
        yield put(loginSuccess(account))
    } catch(e) {
        yield put(acceptTermsError())
    }
}

function* watchTermsAcceptance() {
    yield takeEvery(types.ACCEPT_TERMS, acceptTerms)
}

export default watchTermsAcceptance
