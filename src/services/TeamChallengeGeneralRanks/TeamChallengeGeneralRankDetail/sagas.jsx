import { call, put, takeLatest } from 'redux-saga/effects'
import { getTeamChallengeGeneralRankDetailSuccess, getTeamChallengeGeneralRankDetailError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getTeamChallengeGeneralRankDetail(action) {
    try {
        const { data: rank } = yield call(api.teams.challengeRank, action.teamId, action.year);
        yield put(getTeamChallengeGeneralRankDetailSuccess(rank))
    } catch(e) {
        yield put(getTeamChallengeGeneralRankDetailError())
    }
}

function* watchTeamChallengeGeneralRankDetail() {
    yield takeLatest(types.GET_TEAM_CHALLENGE_GENERAL_RANK_DETAIL, getTeamChallengeGeneralRankDetail)
}

export default watchTeamChallengeGeneralRankDetail