import { call, put, takeEvery } from 'redux-saga/effects'
import { getNextPeriodListSuccess, getNextPeriodListError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getNextPeriodList(action) {
    try {
        const { data: periods } = yield call(api.periods.next);
        yield put(getNextPeriodListSuccess(periods))
    } catch(e) {
        yield put(getNextPeriodListError())
    }
}

function* watchNextPeriodList() {
    yield takeEvery(types.GET_NEXT_PERIOD_LIST, getNextPeriodList)
}

export default watchNextPeriodList