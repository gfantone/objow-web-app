import { call, put, takeEvery } from 'redux-saga/effects'
import { getCurrentCollaboratorBadgeDetailSuccess, getCurrentCollaboratorBadgeDetailError } from './actions'
import {getCollaboratorDetailSuccess} from '../../Collaborators/CollaboratorDetail/actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getCurrentCollaboratorBadgeDetail(action) {
    try {
        const { data: badge } = yield call(api.currentCollaboratorBadges.detail, action.id);
        const {data: collaborator} = yield call(api.collaborators.detail, badge.collaboratorId)
        yield put(getCurrentCollaboratorBadgeDetailSuccess(badge))
        yield put(getCollaboratorDetailSuccess(collaborator))
    } catch(e) {
        yield put(getCurrentCollaboratorBadgeDetailError())
    }
}

function* watchCurrentCollaboratorBadgeDetail() {
    yield takeEvery(types.GET_CURRENT_COLLABORATOR_BADGE_DETAIL, getCurrentCollaboratorBadgeDetail)
}

export default watchCurrentCollaboratorBadgeDetail
