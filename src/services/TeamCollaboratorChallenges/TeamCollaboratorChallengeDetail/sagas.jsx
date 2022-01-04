import { call, put, takeLatest } from 'redux-saga/effects'
import { getTeamCollaboratorChallengeDetailSuccess, getTeamCollaboratorChallengeDetailError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getTeamCollaboratorChallengeDetail(action) {
    try {
        const { data: challenge } = yield call(api.teamCollaboratorChallengeSummaries.detail, action.id);
        const { data: awards } = yield call(api.challenges.awards, challenge.sourceId);
        challenge.awards = awards;
        yield put(getTeamCollaboratorChallengeDetailSuccess(challenge))
    } catch(e) {
        yield put(getTeamCollaboratorChallengeDetailError())
    }
}

function* watchTeamCollaboratorChallengeDetail() {
    yield takeLatest(types.GET_TEAM_COLLABORATOR_CHALLENGE_DETAIL, getTeamCollaboratorChallengeDetail)
}

export default watchTeamCollaboratorChallengeDetail