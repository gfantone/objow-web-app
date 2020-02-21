import { call, put, takeEvery } from 'redux-saga/effects'
import { getManagerListSuccess, getManagerListError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getFreeManagerList(action) {
    try {
        const { data: managers } = yield call(api.managers.free)
        yield put(getManagerListSuccess(managers))
    } catch(e) {
        yield put(getManagerListError())
    }
}

function* watchFreeManagerList() {
    yield takeEvery(types.GET_FREE_MANAGER_LIST, getFreeManagerList)
}

export default watchFreeManagerList