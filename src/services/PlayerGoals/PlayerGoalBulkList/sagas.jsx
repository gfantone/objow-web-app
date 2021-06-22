import { call, put, takeEvery } from 'redux-saga/effects'
import {getPlayerGoalBulkListSuccess, getPlayerGoalBulkListError} from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getPlayerGoalBulkList(action) {
    try {
        const goals = yield call(api.goalDefinitions.collaboratorGoalsBulk, action.definitionId, action.dates, action.teams)

        yield put(getPlayerGoalBulkListSuccess(goals))
    } catch(e) {
        yield put(getPlayerGoalBulkListError())
    }
}

function* watchPlayerGoalBulkList() {
    yield takeEvery(types.GET_PLAYER_GOAL_BULK_LIST, getPlayerGoalBulkList)
}

export default watchPlayerGoalBulkList
