import { call, put, takeLatest } from 'redux-saga/effects'
import { getGoalTypeListSuccess, getGoalTypeListError } from './actions'
import * as actionTypes from './actionTypes'
import api from '../../../data/api/api'

function* getGoalTypeList(action) {
    try {
        const { data: types } = yield call(api.goalTypes.list)
        yield put(getGoalTypeListSuccess(types))
    } catch(e) {
        yield put(getGoalTypeListError())
    }
}

function* watchGoalTypeList() {
    yield takeLatest(actionTypes.GET_GOAL_TYPE_LIST, getGoalTypeList)
}

export default watchGoalTypeList