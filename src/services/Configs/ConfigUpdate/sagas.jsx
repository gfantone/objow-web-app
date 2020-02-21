import { call, put, takeEvery } from 'redux-saga/effects'
import { updateConfigSuccess, updateConfigError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* updateConfig(action) {
    try {
        yield call(api.configs.update, action.code, action.value)
        yield put(updateConfigSuccess())
    } catch(e) {
        yield put(updateConfigError())
    }
}

function* watchConfigUpdate() {
    yield takeEvery(types.UPDATE_CONFIG, updateConfig)
}

export default watchConfigUpdate