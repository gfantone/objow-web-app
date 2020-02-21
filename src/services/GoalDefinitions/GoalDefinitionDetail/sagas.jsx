import { call, put, takeEvery } from 'redux-saga/effects'
import { getGoalDefinitionSuccess, getGoalDefinitionError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getGoalDefinition(action) {
    try {
        var { data: definition } = yield call(api.goalDefinitions.detail, action.id);
        if (definition.type.code == 'C') {
            const { data: points } = yield call(api.periods.collaboratorGoalUsedPoints, definition.period);
            definition.points = points
        } else if (definition.type.code == 'T') {
            const { data: points } = yield call(api.periods.teamGoalUsedPoints, definition.period);
            definition.points = points
        } else {
            definition.points = 0
        }
        yield put(getGoalDefinitionSuccess(definition))
    } catch(e) {
        yield put(getGoalDefinitionError())
    }
}

function* watchGoalDefinition() {
    yield takeEvery(types.GET_GOAL_DEFINITION, getGoalDefinition)
}

export default watchGoalDefinition