import {all, call, put, takeEvery} from 'redux-saga/effects'
import {getGoalDefinitionListSuccess, getGoalDefinitionListError} from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getGoalDefinitions(action) {
    try {
        var { data: definitions } = yield call(api.periods.goalDefinitions, action.periodId, action.isActive, action.allDefinitions);
        if (action.includeData) {
            // const levelCountList = yield all(definitions.map(definition => call(api.goalDefinitions.levelCount, definition.id)));
            // const pointList = yield all(definitions.map(definition => call(api.goalDefinitions.points, definition.id)));
            // const obtainedPointList = yield all(definitions.map(definition => call(api.goalDefinitions.obtainedPoints, definition.id)));
            const usedPointList = yield all(definitions.map(definition => call(api.goalDefinitions.usedPoints, definition.id)));
            const currentPointList = yield all(definitions.map(definition => call(api.goalDefinitions.currentPoints, definition.id)));

            definitions.map(definition => {
                const index = definitions.indexOf(definition);
                // definition.levels = levelCountList[index].data;
                // definition.points = pointList[index].data;
                // definition.obtainedPoints = obtainedPointList[index].data
                definition.usedPoints = usedPointList[index].data
                definition.currentPoints = currentPointList[index].data
            })
        }
        yield put(getGoalDefinitionListSuccess(definitions))
    } catch(e) {
        yield put(getGoalDefinitionListError())
    }
}

function* getGoalDefinitionsByCollaborator(action) {
    try {
        const {data: definitions} = yield call(api.collaborators.definitions, action.collaboratorId, action.periodId, action.current, action.detail)
        if (action.detail) {
            // const levelCountList = yield all(definitions.map(definition => call(api.goalDefinitions.levelCount, definition.id, null, action.collaboratorId)));
            const usedPointList = yield all(definitions.map(definition => call(api.goalDefinitions.usedPoints, definition.id, null, action.collaboratorId)));
            const currentPointList = yield all(definitions.map(definition => call(api.goalDefinitions.currentPoints, definition.id, null, action.collaboratorId)));
            // const obtainedPointList = yield all(definitions.map(definition => call(api.goalDefinitions.obtainedPoints, definition.id, null, action.collaboratorId)));
            definitions.map(definition => {
                const index = definitions.indexOf(definition);
                // definition.levels = levelCountList[index].data;
                definition.usedPoints = usedPointList[index].data;
                definition.currentPoints = currentPointList[index].data;
                // definition.obtainedPoints = obtainedPointList[index].data
            })
        }
        yield put(getGoalDefinitionListSuccess(definitions))
    } catch(e) {
        yield put(getGoalDefinitionListError())
    }
}

function* getGoalDefinitionsByTeam(action) {
    try {
        const {data: definitions} = yield call(api.teams.definitions, action.teamId, action.periodId, action.current, action.detail)
        if (action.detail) {
            // const levelCountList = yield all(definitions.map(definition => call(api.goalDefinitions.levelCount, definition.id, action.teamId, null)));
            const usedPointList = yield all(definitions.map(definition => call(api.goalDefinitions.usedPoints, definition.id, action.teamId, null)));
            const currentPointList = yield all(definitions.map(definition => call(api.goalDefinitions.currentPoints, definition.id, action.teamId, null)));
            // const obtainedPointList = yield all(definitions.map(definition => call(api.goalDefinitions.obtainedPoints, definition.id, action.teamId, null)));
            definitions.map(definition => {
                const index = definitions.indexOf(definition);
                // definition.levels = levelCountList[index].data;
                definition.usedPoints = usedPointList[index].data;
                definition.currentPoints = currentPointList[index].data;
                // definition.obtainedPoints = obtainedPointList[index].data
            })
        }
        yield put(getGoalDefinitionListSuccess(definitions))
    } catch(e) {
        yield put(getGoalDefinitionListError())
    }
}

export function* watchGoalDefinitionList() {
    yield takeEvery(types.GET_GOAL_DEFINITION_LIST, getGoalDefinitions)
}

export function* watchGoalDefinitionListByCollaborator() {
    yield takeEvery(types.GET_GOAL_DEFINITION_LIST_BY_COLLABORATOR, getGoalDefinitionsByCollaborator)
}

export function* watchGoalDefinitionListByTeam() {
    yield takeEvery(types.GET_GOAL_DEFINITION_LIST_BY_TEAM, getGoalDefinitionsByTeam)
}
