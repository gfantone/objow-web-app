import { call, put, takeEvery } from 'redux-saga/effects'
import { getGoalDefinitionLevelTeamPointsSuccess, getGoalDefinitionLevelTeamPointsError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getGoalDefinitionLevelTeamPoints(action) {
    try {
        const { data: points } = yield call(api.periods.teamGoalUsedPoints, action.periodId);
        yield put(getGoalDefinitionLevelTeamPointsSuccess(points))
    } catch(e) {
        yield put(getGoalDefinitionLevelTeamPointsError())
    }
}

function* watchGoalDefinitionLevelTeamPoints() {
    yield takeEvery(types.GET_GOAL_DEFINITION_LEVEL_TEAM_POINTS, getGoalDefinitionLevelTeamPoints)
}

export default watchGoalDefinitionLevelTeamPoints