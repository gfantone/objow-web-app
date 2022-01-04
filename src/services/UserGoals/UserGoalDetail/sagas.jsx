import { all, call, put, takeLatest } from 'redux-saga/effects'
import {getUserGoalDetailSuccess, getUserGoalDetailError} from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getUserGoalDetail(action) {
    try {
        const [{data: goal}, {data: ranking}, {data: indications}, {data: playerGoals}] = yield all([
            call(api.userGoals.detail, action.id),
            call(api.userGoals.ranking, action.id),
            call(api.userGoals.indications, action.id),
            call(api.userGoals.playerGoals, action.id)
        ])
        yield put(getUserGoalDetailSuccess(goal, ranking, indications, playerGoals))
    } catch(e) {
        yield put(getUserGoalDetailError())
    }
}

function* watchUserGoalDetail() {
    yield takeLatest(types.GET_USER_GOAL_DETAIL, getUserGoalDetail)
}

export default watchUserGoalDetail