import { call, put, takeEvery } from 'redux-saga/effects'
import { getGoalDefinitionLevelCollaboratorPointsSuccess, getGoalDefinitionLevelCollaboratorPointsError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getGoalDefinitionLevelCollaboratorPoints(action) {
    try {
        const { data: usedPoints } = yield call(api.periods.collaboratorGoalUsedPoints, action.periodId);
        const { data: currentPoints } = yield call(api.periods.collaboratorGoalCurrentPoints, action.periodId);
        
        yield put(getGoalDefinitionLevelCollaboratorPointsSuccess({
          usedPoints,
          currentPoints
        }))
    } catch(e) {
        yield put(getGoalDefinitionLevelCollaboratorPointsError())
    }
}

function* watchGoalDefinitionLevelCollaboratorPoints() {
    yield takeEvery(types.GET_GOAL_DEFINITION_LEVEL_COLLABORATOR_POINTS, getGoalDefinitionLevelCollaboratorPoints)
}

export default watchGoalDefinitionLevelCollaboratorPoints
