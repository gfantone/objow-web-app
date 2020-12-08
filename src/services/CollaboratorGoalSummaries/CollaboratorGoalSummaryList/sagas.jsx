import {call, put, takeEvery} from 'redux-saga/effects'
import {getCollaboratorGoalSummaryListSuccess, getCollaboratorGoalSummaryListError} from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getCollaboratorGoalSummaryList(action) {
    try {
        var {data: goals} = yield call(api.collaborators.collaboratorGoals, action.id, action.current, action.category, action.year, action.start, action.end, action.name)
        yield put(getCollaboratorGoalSummaryListSuccess(goals))
    } catch(e) {
        yield put(getCollaboratorGoalSummaryListError())
    }
}

function* getCollaboratorGoalSummaryListByDefinitionAndCollaborator(action) {
    try {
        const {data: goals} = yield call(api.collaborators.collaboratorGoalStats, action.definitionId, action.collaboratorId)
        yield put(getCollaboratorGoalSummaryListSuccess(goals))
    } catch(e) {
        yield put(getCollaboratorGoalSummaryListError())
    }
}

export function* watchCollaboratorGoalSummaryList() {
    yield takeEvery(types.GET_COLLABORATOR_GOAL_SUMMARY_LIST, getCollaboratorGoalSummaryList)
}

export function* watchCollaboratorGoalSummaryListByDefinitionAndCollaborator() {
    yield takeEvery(types.GET_COLLABORATOR_GOAL_SUMMARY_LIST_BY_DEFINITION_AND_COLLABORATOR, getCollaboratorGoalSummaryListByDefinitionAndCollaborator)
}
