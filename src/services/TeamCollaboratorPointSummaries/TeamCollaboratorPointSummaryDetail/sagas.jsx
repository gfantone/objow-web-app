import {call, put, takeEvery} from 'redux-saga/effects'
import {getTeamCollaboratorPointSummarySuccesss, getTeamCollaboratorPointSummaryError} from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getTeamCollaboratorPointSummary(action) {
    try {
        const {data: summary} = yield call(api.teams.collaboratorPointSummary, action.teamId, action.periodId)
        yield put(getTeamCollaboratorPointSummarySuccesss(summary))
    } catch(e) {
        yield put(getTeamCollaboratorPointSummaryError())
    }
}

function* watchTeamCollaboratorPointSummaryDetail() {
    yield takeEvery(types.GET_TEAM_COLLABORATOR_POINT_SUMMARY, getTeamCollaboratorPointSummary)
}

export default watchTeamCollaboratorPointSummaryDetail
