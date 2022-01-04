import { all, call, put, takeLatest } from 'redux-saga/effects'
import {getAdminReferenceDataSuccess, getAdminReferenceDataError} from './actions'
import * as types from './actionTypes'
import api from '../../data/api/api'

function* getAdminReferenceData(action) {
    try {
        let [{data: categories}, {data: categoryIcons}, {data: goalTypes}, {data: kpis}, {data: periodicities}] = yield all([
            call(api.categories.list),
            call(api.categoryIcons.list),
            call(api.goalTypes.list),
            call(api.kpis.list),
            call(api.periodicities.list),
        ])
        yield put(getAdminReferenceDataSuccess(categories, categoryIcons, goalTypes, kpis, periodicities))
    } catch(e) {
        yield put(getAdminReferenceDataError())
    }
}

function* watchAdminReferenceData() {
    yield takeLatest(types.GET_ADMIN_REFERENCE_DATA, getAdminReferenceData)
}

export default watchAdminReferenceData