import { all, call, put, takeLatest } from 'redux-saga/effects'
import { updateGoalListSuccess, updateGoalListError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* updateGoalList(action) {
    try {
        yield all(action.goals.map(goal => call(api.goals.updateTarget, goal.id, goal.target)))
        yield put(updateGoalListSuccess())
    } catch(e) {
        yield put(updateGoalListError())
    }
}

function* watchGoalListUpdate() {
    yield takeLatest(types.UPDATE_GOAL_LIST, updateGoalList)
}

export default watchGoalListUpdate