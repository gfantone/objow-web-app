import { call, put, takeEvery } from 'redux-saga/effects'
import { updateBadgeSuccess, updateBadgeError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* updateBadge(action) {
    try {
        yield call(api.badges.updateDescription, action.id, action.description);
        yield put(updateBadgeSuccess())
    } catch(e) {
        yield put(updateBadgeError())
    }
}

function* watchBadgeUpdate() {
    yield takeEvery(types.UPDATE_BADGE, updateBadge)
}

export default watchBadgeUpdate