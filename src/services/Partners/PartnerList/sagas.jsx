import {call, put, takeEvery} from 'redux-saga/effects'
import {getPartnerListSuccess, getPartnerListError} from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getPartnerList(action) {
    try {
        const {data: partners} = yield call(api.partners.list)
        yield put(getPartnerListSuccess(partners))
    } catch(e) {
        yield put(getPartnerListError())
    }
}

function* watchPartnerList() {
    yield takeEvery(types.GET_PARTNER_LIST, getPartnerList)
}

export default watchPartnerList
