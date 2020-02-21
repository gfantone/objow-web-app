import { call, put, takeEvery } from 'redux-saga/effects'
import { getNextCollaboratorBadgeDetailSuccess, getNextCollaboratorBadgeDetailError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getNextCollaboratorBadgeDetail(action) {
    try {
        const { data: badge } = yield call(api.nextCollaboratorBadges.detail, action.id);
        yield put(getNextCollaboratorBadgeDetailSuccess(badge))
    } catch(e) {
        yield put(getNextCollaboratorBadgeDetailError())
    }
}

function* watchNextCollaboratorBadgeDetail() {
    yield takeEvery(types.GET_NEXT_COLLABORATOR_BADGE_DETAIL, getNextCollaboratorBadgeDetail)
}

export default watchNextCollaboratorBadgeDetail