import { call, put, takeEvery } from 'redux-saga/effects'
import { getTeamChallengeListSuccess, getTeamChallengeListError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getTeamChallengeListByCollaborator(action) {
    try {
        const { data: challenges } = yield call(api.collaborators.teamChallenges, action.collaboratorId, action.current, action.year, action.start, action.end);
        yield put(getTeamChallengeListSuccess(challenges))
    } catch(e) {
        yield put(getTeamChallengeListError())
    }
}

function* getTeamChallengeListByTeam(action) {
    try {
        const { data: challenges } = yield call(api.teams.teamChallenges, action.teamId, action.current, action.year, action.start, action.end);
        yield put(getTeamChallengeListSuccess(challenges))
    } catch(e) {
        yield put(getTeamChallengeListError())
    }
}

export function* watchTeamChallengeListByCollaborator() {
    yield takeEvery(types.GET_TEAM_CHALLENGE_LIST_BY_COLLABORATOR, getTeamChallengeListByCollaborator)
}

export function* watchTeamChallengeListByTeam() {
    yield takeEvery(types.GET_TEAM_CHALLENGE_LIST_BY_TEAM, getTeamChallengeListByTeam)
}