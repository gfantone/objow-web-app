import {call, put, takeEvery} from 'redux-saga/effects'
import {getTeamPointSummarySuccess, getTeamPointSummaryError} from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getTeamPointSummaryByCollaborator(action) {
    try {
        const {data: summary} = yield call(api.collaborators.teamPointSummary, action.collaboratorId, action.periodId)
        yield put(getTeamPointSummarySuccess(summary))
    } catch(e) {
        yield put(getTeamPointSummaryError())
    }
}

function* getTeamPointSummaryByTeam(action) {
    try {
        const {data: summary} = yield call(api.teams.teamPointSummary, action.teamId, action.periodId)
        yield put(getTeamPointSummarySuccess(summary))
    } catch(e) {
        yield put(getTeamPointSummaryError())
    }
}

export function* watchTeamPointSummaryDetailByCollaborator() {
    yield takeEvery(types.GET_TEAM_POINT_SUMMARY_DETAIL_BY_COLLABORATOR, getTeamPointSummaryByCollaborator)
}

export function* watchTeamPointSummaryDetailByTeam() {
    yield takeEvery(types.GET_TEAM_POINT_SUMMARY_DETAIL_BY_TEAM, getTeamPointSummaryByTeam)
}
