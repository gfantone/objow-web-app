import { call, put, takeEvery } from 'redux-saga/effects'
import { getCurrentCollaboratorBadgeSummaryListSuccess, getCurrentCollaboratorBadgeSummaryListError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getCurrentCollaboratorBadgeSummaryList(action) {
    try {
        const { data: badges } = yield call(api.collaborators.badgeSummaries, action.collaboratorId, action.year);
        yield put(getCurrentCollaboratorBadgeSummaryListSuccess(badges))
    } catch(e) {
        yield put(getCurrentCollaboratorBadgeSummaryListError())
    }
}

function* watchCurrentCollaboratorBadgeListSummaryList() {
    yield takeEvery(types.GET_CURRENT_COLLABORATOR_BADGE_SUMMARY_LIST, getCurrentCollaboratorBadgeSummaryList)
}

export default watchCurrentCollaboratorBadgeListSummaryList