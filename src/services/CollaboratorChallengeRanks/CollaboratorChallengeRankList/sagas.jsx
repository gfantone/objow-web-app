import { call, put, takeLatest } from 'redux-saga/effects'
import { getCollaboratorChalengeRankListSuccess, getCollaboratorChalengeRankListError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getCollaboratorChalengeRankListByCollaboratorChallenge(action) {
    try {
        const { data: ranks } = yield call(api.collaboratorChallenges.ranks, action.challengeId)
        yield put(getCollaboratorChalengeRankListSuccess(ranks))
    } catch(e) {
        yield put(getCollaboratorChalengeRankListError())
    }
}

function* getCollaboratorChalengeRankListByTeamCollaboratorChallenge(action) {
    try {
        const { data: ranks } = yield call(api.teamCollaboratorChallenges.ranks, action.challengeId)
        yield put(getCollaboratorChalengeRankListSuccess(ranks))
    } catch(e) {
        yield put(getCollaboratorChalengeRankListError())
    }
}

export function* watchCollaboratorChalengeRankListByCollaboratorChallenge() {
    yield takeLatest(types.GET_COLLABORATOR_CHALLENGE_RANK_LIST_BY_COLLABORATOR_CHALLENGE, getCollaboratorChalengeRankListByCollaboratorChallenge)
}

export function* watchCollaboratorChalengeRankListByTeamCollaboratorChallenge() {
    yield takeLatest(types.GET_COLLABORATOR_CHALLENGE_RANK_LIST_BY_TEAM_COLLABORATOR_CHALLENGE, getCollaboratorChalengeRankListByTeamCollaboratorChallenge)
}