import { all, call, put, takeEvery } from 'redux-saga/effects'
import { updateConfigListSuccess, updateConfigListError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* updateConfigList(action) {
    try {
        yield all(action.configs.map(config => call(api.configs.update, config.id, config.value)));
        yield put(updateConfigListSuccess())
    } catch(e) {
        yield put(updateConfigListError())
    }
}

function* watchConfigListUpdate() {
    yield takeEvery(types.UPDATE_CONFIG_LIST, updateConfigList)
}

export default watchConfigListUpdate