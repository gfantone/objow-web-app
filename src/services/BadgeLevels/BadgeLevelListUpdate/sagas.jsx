import { all, call, put, takeEvery } from 'redux-saga/effects'
import { updateBadgeLevelListSuccess, updateBadgeLevelListError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* updateBadgeLevelList(action) {
    try {
        yield all(action.levels.map(level => call(api.badgeLevels.update, level)))
        yield put(updateBadgeLevelListSuccess())
    } catch(e) {
        yield put(updateBadgeLevelListError())
    }
}

function* watchBadgeLevelListUpdate() {
    yield takeEvery(types.UPDATE_BADGE_LEVEL_LIST, updateBadgeLevelList)
}

export default watchBadgeLevelListUpdate