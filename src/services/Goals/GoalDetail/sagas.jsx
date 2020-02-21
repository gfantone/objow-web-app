import { call, put, takeEvery } from 'redux-saga/effects'
import {getGoalDetailSuccess, getGoalDetailError} from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getGoalDetail(action) {
    try {
        const { data: goals } = yield call(api.goalDefinitions.goals, action.definitionId, action.date)
        yield put(getGoalDetailSuccess(goals[0]))
    } catch(e) {
        yield put(getGoalDetailError())
    }
}

function* watchGoalDetail() {
    yield takeEvery(types.GET_GOAL_DETAIL, getGoalDetail)
}

export default watchGoalDetail