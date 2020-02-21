import { call, put, takeEvery } from 'redux-saga/effects'
import { updateLevelListSuccess, updateLevelListError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* updateLevelList(action) {
    try {
        for (var i = 0; i < action.levels.length; i++) {
            const level = action.levels[i];
            yield call(api.levels.update, level.id, level.points)
        }
        yield put(updateLevelListSuccess())
    } catch(e) {
        yield put(updateLevelListError())
    }
}

function* watchLevelListUpdate() {
    yield takeEvery(types.UPDATE_LEVEL_LIST, updateLevelList)
}

export default watchLevelListUpdate