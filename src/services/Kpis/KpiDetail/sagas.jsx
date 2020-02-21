import { call, put, takeEvery } from 'redux-saga/effects'
import { getKpiDetailSuccess, getKpiDetailError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getKpiDetail(action) {
    try {
        const { data: kpi } = yield call(api.kpis.detail, action.id)
        yield put(getKpiDetailSuccess(kpi))
    } catch(e) {
        yield put(getKpiDetailError())
    }
}

function* watchKpiDetail() {
    yield takeEvery(types.GET_KPI_DETAIL, getKpiDetail)
}

export default watchKpiDetail