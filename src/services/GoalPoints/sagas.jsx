import { call, put, takeEvery } from 'redux-saga/effects'
import {getGoalPointsSuccess, getGoalPointsError} from './actions'
import * as types from './actionTypes'
import api from '../../data/api/api'

function* getGoalPoints(action) {
    try {
        let {data: points} = yield call(api.goalPoints.list)
        yield put(getGoalPointsSuccess(points))
    } catch(e) {
        yield put(getGoalPointsError())
    }
}

function* watchGoalPoints() {
    yield takeEvery(types.GET_GOAL_POINTS, getGoalPoints)
}

export default watchGoalPoints