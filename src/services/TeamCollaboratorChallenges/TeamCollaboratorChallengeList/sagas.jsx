import { call, put, takeLatest } from 'redux-saga/effects'
import { getTeamCollaboratorChallengeListSuccess, getTeamCollaboratorChallengeListError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getTeamCollaboratorChallengeList(action) {
    try {
        const { data: challenges } = yield call(api.teams.collaboratorChallenges, action.teamId, action.time, action.year, action.start, action.end, action.challengeType);
        yield put(getTeamCollaboratorChallengeListSuccess(challenges))
    } catch(e) {
        yield put(getTeamCollaboratorChallengeListError())
    }
}

function* watchTeamCollaboratorChallengeList() {
    yield takeLatest(types.GET_TEAM_COLLABORATOR_CHALLENGE_LIST, getTeamCollaboratorChallengeList)
}

export default watchTeamCollaboratorChallengeList
