import { call, put, takeEvery } from 'redux-saga/effects'
import { getCollaboratorGoalRankListSuccess, getCollaboratorGoalRankListError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getCollaboratorGoalRankListByCollaboratorGoal(action) {
    try {
        const { data: ranks } = yield call(api.collaboratorGoals.ranks, action.goalId)
        yield put(getCollaboratorGoalRankListSuccess(ranks))
    } catch(e) {
        yield put(getCollaboratorGoalRankListError())
    }
}

function* getCollaboratorGoalRankListByTeamCollaboratorGoal(action) {
    try {
        const { data: ranks } = yield call(api.teamCollaboratorGoals.ranks, action.goalId)
        yield put(getCollaboratorGoalRankListSuccess(ranks))
    } catch(e) {
        yield put(getCollaboratorGoalRankListError())
    }
}

export function* watchCollaboratorGoalRankListByCollaboratorGOal() {
    yield takeEvery(types.GET_COLLABORATOR_GOAL_RANK_LIST_BY_COLLABORATOR_GOAL, getCollaboratorGoalRankListByCollaboratorGoal)
}

export function* watchCollaboratorGoalRankListByTeamCollaboratorGoal() {
    yield takeEvery(types.GET_COLLABORATOR_GOAL_RANK_LIST_BY_TEAM_COLLABORATOR_GOAL, getCollaboratorGoalRankListByTeamCollaboratorGoal)
}