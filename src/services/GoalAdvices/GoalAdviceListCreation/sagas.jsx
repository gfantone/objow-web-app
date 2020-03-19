import { call, put, takeEvery } from 'redux-saga/effects'
import { createGoalAdviceListSuccess, createGoalAdviceListError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* createGoalAdviceList(action) {
    try {
        yield call(api.goals.changeAdvices, action.goalId, action.advices);
        yield put(createGoalAdviceListSuccess())
    } catch(e) {
        yield put(createGoalAdviceListError())
    }
}

export function* watchGoalAdviceListCreation() {
    yield takeEvery(types.CREATE_GOAL_ADVICE_LIST, createGoalAdviceList)
}

export default watchGoalAdviceListCreation
