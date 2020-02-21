import { call, put, takeEvery } from 'redux-saga/effects'
import { removeBadgeLevelSuccess, removeBadgeLevelError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* removeBadgeLevel(action) {
    try {
        yield call(api.badgeLevels.remove, action.id)
        yield put(removeBadgeLevelSuccess())
    } catch(e) {
        yield put(removeBadgeLevelError())
    }
}

function* watchBadgeLevelRemoving() {
    yield takeEvery(types.REMOVE_BADGE_LEVEL, removeBadgeLevel)
}

export default watchBadgeLevelRemoving