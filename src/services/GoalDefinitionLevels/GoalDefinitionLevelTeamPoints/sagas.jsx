import { call, put, takeEvery } from 'redux-saga/effects'
import { getGoalDefinitionLevelTeamPointsSuccess, getGoalDefinitionLevelTeamPointsError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getGoalDefinitionLevelTeamPoints(action) {
    try {
        const { data: usedPoints } = yield call(api.periods.teamGoalUsedPoints, action.periodId);
        const { data: currentPoints } = yield call(api.periods.teamGoalCurrentPoints, action.periodId);
        console.log(usedPoints, currentPoints);
        yield put(getGoalDefinitionLevelTeamPointsSuccess({
          usedPoints,
          currentPoints
        }))
    } catch(e) {
        yield put(getGoalDefinitionLevelTeamPointsError())
    }
}

function* watchGoalDefinitionLevelTeamPoints() {
    yield takeEvery(types.GET_GOAL_DEFINITION_LEVEL_TEAM_POINTS, getGoalDefinitionLevelTeamPoints)
}

export default watchGoalDefinitionLevelTeamPoints
