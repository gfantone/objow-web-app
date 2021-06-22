import { call, put, takeEvery } from 'redux-saga/effects'
import {getTeamPlayerGoalDetailSuccess, getTeamPlayerGoalDetailError} from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getTeamPlayerGoalDetail(action) {
    try {
        const { data: goals } = yield call(api.goalDefinitions.teamCollaboratorGoals, action.definitionId, action.date, action.team)
        console.log(goals);
        yield put(getTeamPlayerGoalDetailSuccess(goals[0]))
    } catch(e) {
        yield put(getTeamPlayerGoalDetailError())
    }
}

function* watchTeamPlayerGoalDetail() {
    yield takeEvery(types.GET_TEAM_PLAYER_GOAL_DETAIL, getTeamPlayerGoalDetail)
}

export default watchTeamPlayerGoalDetail
