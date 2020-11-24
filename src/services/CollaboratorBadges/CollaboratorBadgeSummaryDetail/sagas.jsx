import {call, put, takeEvery} from 'redux-saga/effects'
import {getCollaboratorBadgeSummarySuccess, getCollaboratorBadgeSummaryError} from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getCollaboratorBadgeSummary(action) {
    try {
        const {data: summary} = yield call(api.collaboratorBadgeSummary.detail, action.id);
        yield put(getCollaboratorBadgeSummarySuccess(summary))
    } catch(e) {
        yield put(getCollaboratorBadgeSummaryError())
    }
}

function* watchCollaboratorBadgeSummaryDetail() {
    yield takeEvery(types.GET_COLLABORATOR_BADGE_SUMMARY, getCollaboratorBadgeSummary)
}

export default watchCollaboratorBadgeSummaryDetail
