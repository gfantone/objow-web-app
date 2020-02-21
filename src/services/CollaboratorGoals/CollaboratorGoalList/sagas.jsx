import { call, put, takeEvery } from 'redux-saga/effects'
import { getCollaboratorGoalListSuccess, getCollaboratorGoalListError } from './actions'
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

export function* watchCollaboratorGoalListByTeamCollaboratorGoal() {
    yield takeEvery(types.GET_COLLABORATOR_GOAL_LIST_BY_TEAM_COLLABORATOR_GOAL, getCollaboratorGoalListByTeamCollaboratorGoal)
}