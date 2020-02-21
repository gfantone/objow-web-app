import { call, put, takeEvery } from 'redux-saga/effects'
import {getTeamPlayerGoalListSuccess, getTeamPlayerGoalListError} from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getTeamPlayerGoalList(action) {
    try {
        const { data: goals } = yield call(api.goalDefinitions.teamCollaboratorGoals, action.definitionId, action.date)
        yield put(getTeamPlayerGoalListSuccess(goals))
    } catch(e) {
        yield put(getTeamPlayerGoalListError())
    }
}

function* watchTeamPlayerGoalList() {
    yield takeEvery(types.GET_TEAM_PLAYER_GOAL_LIST, getTeamPlayerGoalList)
}

export default watchTeamPlayerGoalList