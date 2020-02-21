import { call, put, takeEvery } from 'redux-saga/effects'
import { getTeamChallengeGoalListSuccess, getTeamChallengeGoalListError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getTeamChallengeGoalList(action) {
    try {
        const { data: goals } = yield call(api.teamChallenges.goals, action.challengeId)
        yield put(getTeamChallengeGoalListSuccess(goals))
    } catch(e) {
        yield put(getTeamChallengeGoalListError())
    }
}

function* watchTeamChallengeGoalList() {
    yield takeEvery(types.GET_TEAM_CHALLENGE_GOAL_LIST, getTeamChallengeGoalList)
}

export default watchTeamChallengeGoalList