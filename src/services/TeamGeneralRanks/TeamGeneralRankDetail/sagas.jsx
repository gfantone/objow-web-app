import { call, put, takeLatest } from 'redux-saga/effects'
import { getTeamGeneralRankDetailSuccess, getTeamGeneralRankDetailError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getTeamGeneralRankDetail(action) {
    try {
        const { data: rank } = yield call(api.teams.generalRank, action.teamId, action.year);
        yield put(getTeamGeneralRankDetailSuccess(rank))
    } catch(e) {
        yield put(getTeamGeneralRankDetailError())
    }
}

function* watchTeamGeneralRankDetail() {
    yield takeLatest(types.GET_TEAM_GENERAL_RANK_DETAIL, getTeamGeneralRankDetail)
}

export default watchTeamGeneralRankDetail