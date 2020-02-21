import { call, put, takeEvery } from 'redux-saga/effects'
import { getKpiListSuccess, getKpiListError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getKpiList(action) {
    try {
        const { data } = yield call(api.kpis.list)
        yield put(getKpiListSuccess(data))
    } catch(e) {
        yield put(getKpiListError())
    }
}

function* watchKpiList() {
    yield takeEvery(types.GET_KPI_LIST, getKpiList)
}

export default watchKpiList