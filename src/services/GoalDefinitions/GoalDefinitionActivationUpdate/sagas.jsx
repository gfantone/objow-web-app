import {call, put, takeLatest} from 'redux-saga/effects'
import {updateGoalDefinitionActivationSuccess, updateGoalDefinitionActivationError} from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* updateGoalDefinitionActivation(action) {
    try {
        yield call(api.goalDefinitions.updateActivation, action.id, action.isActive)
        yield put(updateGoalDefinitionActivationSuccess())
    } catch(e) {
        yield put(updateGoalDefinitionActivationError())
    }
}

function* watchGoalDefinitionActivationUpdate() {
    yield takeLatest(types.UPDATE_GOAL_DEFINITION_ACTIVATION, updateGoalDefinitionActivation)
}

export default watchGoalDefinitionActivationUpdate
