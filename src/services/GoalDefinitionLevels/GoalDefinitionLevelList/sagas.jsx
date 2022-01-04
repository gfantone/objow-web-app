import { all, call, put, takeLatest } from 'redux-saga/effects'
import { getGoalDefinitionLevelListSuccess, getGoalDefinitionLevelListError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getGoaLDefinitionLevelList(action) {
    try {
        const { data: levels } = yield call(api.goalDefinitions.levels, action.definitionId, action.teamId, action.collaboratorId)
        yield put(getGoalDefinitionLevelListSuccess(levels))
    } catch(e) {
        yield put(getGoalDefinitionLevelListError())
    }
}

function* watchGoalDefinitionLevelList() {
    yield takeLatest(types.GET_GOAL_DEFINITION_LEVEL_LIST, getGoaLDefinitionLevelList)
}

export default watchGoalDefinitionLevelList
