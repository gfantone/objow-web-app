import { all, call, put, takeEvery } from 'redux-saga/effects'
import { getTeamGoalDetailSuccess, getTeamGoalDetailError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getTeamGoalDetail(action) {
    try {
        const [
            { data: goal },
            { data: levels },
            { data: definition }
        ] = yield all([
            call(api.teamGoalSummaries.detail, action.id),
            call(api.teamGoals.levels, action.id),
            call(api.teamGoals.definition, action.id),
        ])
        goal.levels = levels
        goal.definition = definition
        yield put(getTeamGoalDetailSuccess(goal))
    } catch(e) {
        yield put(getTeamGoalDetailError())
    }
}

function* watchTeamGoalDetail() {
    yield takeEvery(types.GET_TEAM_GOAL_DETAIL, getTeamGoalDetail)
}

export default watchTeamGoalDetail