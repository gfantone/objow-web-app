import { call, put, takeLatest } from 'redux-saga/effects'
import { getGoalDefinitionLevelTeamPointsSuccess, getGoalDefinitionLevelTeamPointsError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getGoalDefinitionLevelTeamPoints(action) {
    try {
        const { data: usedPoints } = yield call(api.periods.teamGoalUsedPoints, action.periodId);
        const { data: currentPoints } = yield call(api.periods.teamGoalCurrentPoints, action.periodId);

        yield put(getGoalDefinitionLevelTeamPointsSuccess({
          usedPoints,
          currentPoints
        }))
    } catch(e) {
        yield put(getGoalDefinitionLevelTeamPointsError())
    }
}

function* getGoalDefinitionLevelTeamPointsByCollaborator(action) {
    try {
        const { data: usedPoints } = yield call(api.periods.teamGoalUsedPoints, action.periodId, null, action.collaboratorId);
        const { data: currentPoints } = yield call(api.periods.teamGoalCurrentPoints, action.periodId, null, action.collaboratorId);

        yield put(getGoalDefinitionLevelTeamPointsSuccess({
          usedPoints,
          currentPoints
        }))
    } catch(e) {
        yield put(getGoalDefinitionLevelTeamPointsError())
    }
}

function* getGoalDefinitionLevelTeamPointsByTeam(action) {
    try {
        const { data: usedPoints } = yield call(api.periods.teamGoalUsedPoints, action.periodId, action.teamId, null);
        const { data: currentPoints } = yield call(api.periods.teamGoalCurrentPoints, action.periodId, action.teamId, null);

        yield put(getGoalDefinitionLevelTeamPointsSuccess({
          usedPoints,
          currentPoints
        }))
    } catch(e) {
        yield put(getGoalDefinitionLevelTeamPointsError())
    }
}

export function* watchGoalDefinitionLevelTeamPoints() {
    yield takeLatest(types.GET_GOAL_DEFINITION_LEVEL_TEAM_POINTS, getGoalDefinitionLevelTeamPoints)
}
export function* watchGoalDefinitionLevelTeamPointsByTeam() {
    yield takeLatest(types.GET_GOAL_DEFINITION_LEVEL_TEAM_POINTS_BY_TEAM, getGoalDefinitionLevelTeamPointsByTeam)
}
export function* watchGoalDefinitionLevelTeamPointsByCollaborator() {
    yield takeLatest(types.GET_GOAL_DEFINITION_LEVEL_TEAM_POINTS_BY_COLLABORATOR, getGoalDefinitionLevelTeamPointsByCollaborator)
}
