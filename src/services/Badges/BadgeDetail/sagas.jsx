import { call, put, takeLatest } from 'redux-saga/effects'
import { getBadgeDetailSuccess, getBadgeDetailError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getBadgeDetail(action) {
    try {
        var { data: badge } = yield call(api.badges.detail, action.id)
        yield put(getBadgeDetailSuccess(badge))
    } catch(e) {
        yield put(getBadgeDetailError())
    }
}

function* watchBadgeDetail() {
    yield takeLatest(types.GET_BADGE_DETAIL, getBadgeDetail)
}

export default watchBadgeDetail