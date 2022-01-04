import { call, put, takeLatest } from 'redux-saga/effects'
import { getCollaboratorChallengeDetailSuccess, getCollaboratorChallengeDetailError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getCollaboratorChallengeDetail(action) {
    try {
        const { data: challenge } = yield call(api.collaboratorChallengeSummaries.detail, action.id);
        const { data: awards } = yield call(api.challenges.awards, challenge.sourceId);
        challenge.awards = awards;
        yield put(getCollaboratorChallengeDetailSuccess(challenge))
    } catch(e) {
        yield put(getCollaboratorChallengeDetailError())
    }
}

function* watchCollaboratorChallengeDetail() {
    yield takeLatest(types.GET_COLLABORATOR_CHALLENGE_DETAIL, getCollaboratorChallengeDetail)
}

export default watchCollaboratorChallengeDetail