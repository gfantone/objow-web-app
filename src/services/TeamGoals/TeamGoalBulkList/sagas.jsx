import { call, put, takeEvery } from 'redux-saga/effects'
import { getTeamGoalBulkListSuccess, getTeamGoalBulkListError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getTeamGoalBulkListByDefinition(action) {
    try {
        const goals = yield call(api.goalDefinitions.teamGoalsBulk, action.definitionId, action.dates)
        yield put(getTeamGoalBulkListSuccess(goals))
    } catch(e) {
        yield put(getTeamGoalBulkListError())
    }
}

function* watchTeamGoalListByDefinition() {
    yield takeEvery(types.GET_TEAM_GOAL_BULK_LIST_BY_DEFINITION, getTeamGoalBulkListByDefinition)
}

export default watchTeamGoalBulkListByDefinition
