import { call, put, takeLatest } from 'redux-saga/effects'
import { createKpiSuccess, createKpiError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* createKpi(action) {
    try {
        yield call(api.kpis.create, action.kpi)
        yield put(createKpiSuccess())
    } catch(e) {
        yield put(createKpiError())
    }
}

function* watchKpiCreation() {
    yield takeLatest(types.CREATE_KPI, createKpi)
}

export default watchKpiCreation
