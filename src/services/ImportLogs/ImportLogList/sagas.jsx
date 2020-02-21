import { call, put, takeEvery } from 'redux-saga/effects'
import { getImportLogListSuccess, getImportLogListError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getImportLogList(action) {
    try {
        const { data: logs } = yield call(api.importLogs.list)
        yield put(getImportLogListSuccess(logs))
    } catch(e) {
        yield put(getImportLogListError())
    }
}

function* watchImportLogList() {
    yield takeEvery(types.GET_IMPORT_LOG_LIST, getImportLogList)
}

export default watchImportLogList