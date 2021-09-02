import {call, put, takeEvery} from 'redux-saga/effects'
import {getTeamCollaboratorGoalListSuccess, getTeamCollaboratorGoalListError} from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getTeamCollaboratorGoalList(action) {
    try {
        const {data: goals} = yield call(api.teams.collaboratorGoals, action.teamId, action.current, action.category, action.year, action.start, action.end, action.name, action.definition, action.all)
        yield put(getTeamCollaboratorGoalListSuccess(goals))
    } catch(e) {
        yield put(getTeamCollaboratorGoalListError())
    }
}

function* getTeamCollaboratorGoalListByDefinitionAndTeam(action) {
    try {
        const {data: goals} = yield call(api.teams.collaboratorGoalStats, action.definitionId, action.teamId)
        yield put(getTeamCollaboratorGoalListSuccess(goals))
    } catch(e) {
        yield put(getTeamCollaboratorGoalListError())
    }
}

export function* watchTeamCollaboratorGoalList() {
    yield takeEvery(types.GET_TEAM_COLLABORATOR_GOAL_LIST, getTeamCollaboratorGoalList)
}

export function* watchTeamCollaboratorGoalListByDefinitionAndTeam() {
    yield takeEvery(types.GET_TEAM_COLLABORATOR_GOAL_LIST_BY_DEFINITION_AND_TEAM, getTeamCollaboratorGoalListByDefinitionAndTeam)
}
