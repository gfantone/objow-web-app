import { all, call, put, takeEvery } from 'redux-saga/effects'
import { updateGoalDefinitionLevelListSuccess, updateGoalDefinitionLevelListError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* updateGoalDefinitionLevelList(action) {
    try {
        yield all(action.removedLevels.map(level => call(api.goalDefinitionLevels.remove, level.id)));
        yield all(action.oldLevels.map(level => call(api.goalDefinitionLevels.update, level)));
        yield all(action.newLevels.map(level => call(api.goalDefinitionLevels.create, level)));
        yield put(updateGoalDefinitionLevelListSuccess())
    } catch(e) {
        yield put(updateGoalDefinitionLevelListError())
    }
}

function* watchGoalDefinitionLevelListUpdate() {
    yield takeEvery(types.UPDATE_GOAL_DEFINITION_LEVEL_LIST, updateGoalDefinitionLevelList)
}

export default watchGoalDefinitionLevelListUpdate