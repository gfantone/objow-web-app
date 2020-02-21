import { call, put, takeEvery } from 'redux-saga/effects'
import { getPeriodicityListSuccess, getPeriodicityListError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getPeriodicityList(action) {
    try {
        const { data: periodicities } = yield call(api.periodicities.list)
        yield put(getPeriodicityListSuccess(periodicities))
    } catch(e) {
        yield put(getPeriodicityListError())
    }
}

function* watchPeriodicityList() {
    yield takeEvery(types.GET_PERIODICITY_LIST, getPeriodicityList)
}

export default watchPeriodicityList