import { call, put, takeEvery } from 'redux-saga/effects'
import { removeLevelListSuccess, removeLevelListError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* removeLevelList(action) {
    try {
        for (var i = 0; i < action.levels.length; i++) {
            const level = action.levels[i];
            yield call(api.levels.remove, level.id)
        }
        yield put(removeLevelListSuccess())
    } catch(e) {
        yield put(removeLevelListError())
    }
}

function* watchLevelListRemoving() {
    yield takeEvery(types.REMOVE_LEVEL_LIST, removeLevelList)
}

export default watchLevelListRemoving