import { call, put, takeEvery } from 'redux-saga/effects'
import { getGoalListSuccess, getGoalListError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getGoalList(action) {
    try {
        const { data: goals } = yield call(api.goalDefinitions.goals, action.definitionId)
        yield put(getGoalListSuccess(goals))
    } catch(e) {
        yield put(getGoalListError())
    }
}

function* watchGoalList() {
    yield takeEvery(types.GET_GOAL_LIST, getGoalList)
}

export default watchGoalList