import { call, put, takeEvery } from 'redux-saga/effects'
import { getTeamGoalRankListSuccess, getTeamGoalRankListError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getTeamGoalRankList(action) {
    try {
        const { data: ranks } = yield call(api.teamGoals.ranks, action.goalId)
        yield put(getTeamGoalRankListSuccess(ranks))
    } catch(e) {
        yield put(getTeamGoalRankListError())
    }
}

function* watchTeamGoalRankList() {
    yield takeEvery(types.GET_TEAM_GOAL_RANK_LIST, getTeamGoalRankList)
}

export default watchTeamGoalRankList