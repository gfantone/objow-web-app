import {call, put, takeLatest} from 'redux-saga/effects'
import {getTeamGoalSummaryListSuccess, getTeamGoalSummaryListError} from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getTeamGoalSummaryListByCollaborator(action) {
    try {
        const {data: goals} = yield call(api.collaborators.teamGoals, action.collaboratorId, action.current, action.category, action.year, action.start, action.end, action.name, action.definition, action.all)
        yield put(getTeamGoalSummaryListSuccess(goals))
    } catch(e) {
        yield put(getTeamGoalSummaryListError())
    }
}

function* getTeamGoalSummaryListByDefinitionAndCollaborator(action) {
    try {
        const {data: goals} = yield call(api.collaborators.teamGoalStats, action.definitionId, action.collaboratorId)
        yield put(getTeamGoalSummaryListSuccess(goals))
    } catch(e) {
        yield put(getTeamGoalSummaryListError())
    }
}

function* getTeamGoalSummaryListByDefinitionAndTeam(action) {
    try {
        const {data: goals} = yield call(api.teams.teamGoalStats, action.definitionId, action.teamId)
        yield put(getTeamGoalSummaryListSuccess(goals))
    } catch(e) {
        yield put(getTeamGoalSummaryListError())
    }
}

function* getTeamGoalSummaryListByTeam(action) {
    try {
        const {data: goals} = yield call(api.teams.teamGoals, action.teamId, action.current, action.category, action.year, action.start, action.end, action.name, action.definition, action.all)
        yield put(getTeamGoalSummaryListSuccess(goals))
    } catch(e) {
        yield put(getTeamGoalSummaryListError())
    }
}

export function* watchTeamGoalSummaryListByCollaborator() {
    yield takeLatest(types.GET_TEAM_GOAL_SUMMARY_LIST_BY_COLLABORATOR, getTeamGoalSummaryListByCollaborator)
}

export function* watchTeamGoalSummaryListByDefinitionAndCollaborator() {
    yield takeLatest(types.GET_TEAM_GOAL_SUMMARY_LIST_BY_DEFINITION_AND_COLLABORATOR, getTeamGoalSummaryListByDefinitionAndCollaborator)
}

export function* watchTeamGoalSummaryListByDefinitionAndTeam() {
    yield takeLatest(types.GET_TEAM_GOAL_SUMMARY_LIST_BY_DEFINITION_AND_TEAM, getTeamGoalSummaryListByDefinitionAndTeam)
}

export function* watchTeamGoalSummaryListByTeam() {
    yield takeLatest(types.GET_TEAM_GOAL_SUMMARY_LIST_BY_TEAM, getTeamGoalSummaryListByTeam)
}
