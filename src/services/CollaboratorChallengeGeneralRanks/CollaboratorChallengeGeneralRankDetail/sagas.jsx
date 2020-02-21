import { call, put, takeEvery } from 'redux-saga/effects'
import { getCollaboratorChallengeGeneralRankDetailSuccess, getCollaboratorChallengeGeneralRankDetailError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getCollaboratorChallengeGeneralRankDetail(action) {
    try {
        const { data: rank } = yield call(api.collaborators.challengeRank, action.collaboratorId, action.year);
        yield put(getCollaboratorChallengeGeneralRankDetailSuccess(rank))
    } catch(e) {
        yield put(getCollaboratorChallengeGeneralRankDetailError())
    }
}

function* watchCollaboratorChallengeGeneralRankDetail() {
    yield takeEvery(types.GET_COLLABORATOR_CHALLENGE_GENERAL_RANK_DETAIL, getCollaboratorChallengeGeneralRankDetail)
}

export default watchCollaboratorChallengeGeneralRankDetail