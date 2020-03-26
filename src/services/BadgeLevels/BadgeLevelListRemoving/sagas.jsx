import {all, call, put, takeEvery} from 'redux-saga/effects'
import {removeBadgeLevelListSuccess, removeBadgeLevelListError} from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* removeBadgeLevelList(action) {
    try {
        yield all(action.ids.map(id => call(api.badgeLevels.remove, id)));
        yield put(removeBadgeLevelListSuccess())
    } catch(e) {
        yield put(removeBadgeLevelListError())
    }
}

function* watchBadgeLevelListRemoving() {
    yield takeEvery(types.REMOVE_BADGE_LEVEL_LIST, removeBadgeLevelList)
}

export default watchBadgeLevelListRemoving
