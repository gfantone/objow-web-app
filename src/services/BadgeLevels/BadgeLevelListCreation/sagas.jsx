import { all, call, put, takeEvery } from 'redux-saga/effects'
import { createBadgeLevelListSuccess, createBadgeLevelListError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* createBadgeLevelList(action) {
    try {
        yield all(action.levels.map(level => call(api.badgeLevels.create, level)))
        yield put(createBadgeLevelListSuccess())
    } catch(e) {
        yield put(createBadgeLevelListError())
    }
}

function* watchBadgeLevelListCreation() {
    yield takeEvery(types.CREATE_BADGE_LEVEL_LIST, createBadgeLevelList)
}

export default watchBadgeLevelListCreation