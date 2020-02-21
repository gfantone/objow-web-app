import { call, put, takeEvery } from 'redux-saga/effects'
import {updateGoalDefinitionSuccess, updateGoalDefinitionError} from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* performGoalDefinitionUpdate(action) {
    try {
        let {data: definition} = yield call(api.goalDefinitions.update, action.id, action.definition)
        yield put(updateGoalDefinitionSuccess(definition))
    } catch(e) {
        yield put(updateGoalDefinitionError())
    }
}

function* watchGoalDefinitionUpdate() {
    yield takeEvery(types.UPDATE_GOAL_DEFINITION, performGoalDefinitionUpdate)
}

export default watchGoalDefinitionUpdate