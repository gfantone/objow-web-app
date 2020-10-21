import { call, put, takeEvery } from 'redux-saga/effects'
import { getKpiListSuccess, getKpiListError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getKpiList(action) {
    try {
        const {data: partners} = yield call(api.kpis.list)
        yield put(getKpiListSuccess(partners))
    } catch(e) {
        yield put(getKpiListError())
    }
}

function* getKpiListByPartner(action) {
    try {
        const {data: partners} = yield call(api.partners.kpis, action.partnerId)
        yield put(getKpiListSuccess(partners))
    } catch(e) {
        yield put(getKpiListError())
    }
}

export function* watchKpiList() {
    yield takeEvery(types.GET_KPI_LIST, getKpiList)
}

export function* watchKpiListByPartner() {
    yield takeEvery(types.GET_KPI_LIST_BY_PARTNER, getKpiListByPartner)
}
