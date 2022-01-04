import { call, put, takeLatest } from 'redux-saga/effects'
import { getCollaboratorGoalListSuccess, getCollaboratorGoalListError, getCollaboratorGoalListByGoalSuccess, getCollaboratorGoalListByGoalError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getCollaboratorGoalListByTeamCollaboratorGoal(action) {
    try {
        var { data: goals } = yield call(api.teamCollaboratorGoals.goals, action.teamCollaboratorGoalId)
        yield put(getCollaboratorGoalListSuccess(goals))
    } catch(e) {
        yield put(getCollaboratorGoalListError())
    }
}

function* getCollaboratorGoalListByGoal(action) {
    try {
        var { data: goals } = yield call(api.collaboratorGoals.goals, action.goalId)
        yield put(getCollaboratorGoalListByGoalSuccess(goals))
    } catch(e) {
        yield put(getCollaboratorGoalListByGoalError())
    }
}

export function* watchCollaboratorGoalListByTeamCollaboratorGoal() {
    yield takeLatest(types.GET_COLLABORATOR_GOAL_LIST_BY_TEAM_COLLABORATOR_GOAL, getCollaboratorGoalListByTeamCollaboratorGoal)
}

export function* watchCollaboratorGoalListByGoal() {
    yield takeLatest(types.GET_COLLABORATOR_GOAL_LIST_BY_GOAL, getCollaboratorGoalListByGoal)
}
