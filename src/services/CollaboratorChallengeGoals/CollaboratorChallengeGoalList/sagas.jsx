import { call, put, takeLatest } from 'redux-saga/effects'
import { getCollaboratorChallengeGoalListSuccess, getCollaboratorChallengeGoalListError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getCollaboratorChallengeGoalList(action) {
    try {
        const { data: goals } = yield call(api.collaboratorChallenges.goals, action.challengeId)
        yield put(getCollaboratorChallengeGoalListSuccess(goals))
    } catch(e) {
        yield put(getCollaboratorChallengeGoalListError())
    }
}

function* watchCollaboratorChallengeGoalList() {
    yield takeLatest(types.GET_COLLABORATOR_CHALLENGE_GOAL_LIST, getCollaboratorChallengeGoalList)
}

export default watchCollaboratorChallengeGoalList