import { call, put, takeEvery } from 'redux-saga/effects'
import { getTeamGoalListSuccess, getTeamGoalListError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getTeamGoalListByDefinition(action) {
    try {
        const { data: goals } = yield call(api.goalDefinitions.teamGoals, action.definitionId, action.date)
        yield put(getTeamGoalListSuccess(goals))
    } catch(e) {
        yield put(getTeamGoalListError())
    }
}

function* watchTeamGoalListByDefinition() {
    yield takeEvery(types.GET_TEAM_GOAL_LIST_BY_DEFINITION, getTeamGoalListByDefinition)
}

export default watchTeamGoalListByDefinition