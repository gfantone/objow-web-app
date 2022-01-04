import { call, put, takeLatest } from 'redux-saga/effects'
import { getGoalAdviceListSuccess, getGoalAdviceListError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getGoalAdviceListByCollaboratorGoal(action) {
    try {
        const { data: advices } = yield call(api.collaboratorGoals.advices, action.id);
        yield put(getGoalAdviceListSuccess(advices))
    } catch(e) {
        yield put(getGoalAdviceListError())
    }
}

function* getGoalAdviceListByTeamGoal(action) {
    try {
        const { data: advices } = yield call(api.teamGoals.advices, action.id);
        yield put(getGoalAdviceListSuccess(advices))
    } catch(e) {
        yield put(getGoalAdviceListError())
    }
}

function* getGoalAdviceListByTeamCollaboratorGoal(action) {
    try {
        const { data: advices } = yield call(api.teamCollaboratorGoals.advices, action.id);
        yield put(getGoalAdviceListSuccess(advices))
    } catch(e) {
        yield put(getGoalAdviceListError())
    }
}

export function* watchGoalAdviceListByCollaboratorGoal() {
    yield takeLatest(types.GET_GOAL_ADVICE_LIST_BY_COLLABORATOR_GOAL, getGoalAdviceListByCollaboratorGoal)
}

export function* watchGoalAdviceListByTeamGoal() {
    yield takeLatest(types.GET_GOAL_ADVICE_LIST_BY_TEAM_GOAL, getGoalAdviceListByTeamGoal)
}

export function* watchGoalAdviceListByTeamCollaboratorGoal() {
    yield takeLatest(types.GET_GOAL_ADVICE_LIST_BY_TEAM_COLLABORATOR_GOAL, getGoalAdviceListByTeamCollaboratorGoal)
}
