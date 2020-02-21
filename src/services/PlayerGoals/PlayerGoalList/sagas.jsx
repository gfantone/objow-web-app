import { call, put, takeEvery } from 'redux-saga/effects'
import {getPlayerGoalListSuccess, getPlayerGoalListError} from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getPlayerGoalList(action) {
    try {
        const { data: goals } = yield call(api.goalDefinitions.collaboratorGoals, action.definitionId, action.date, action.team)
        yield put(getPlayerGoalListSuccess(goals))
    } catch(e) {
        yield put(getPlayerGoalListError())
    }
}

function* watchPlayerGoalList() {
    yield takeEvery(types.GET_PLAYER_GOAL_LIST, getPlayerGoalList)
}

export default watchPlayerGoalList