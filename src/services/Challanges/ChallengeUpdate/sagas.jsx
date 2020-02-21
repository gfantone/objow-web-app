import { call, put, takeEvery } from 'redux-saga/effects'
import {updateChallengeSuccess, updateChallengeError} from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* updateChallenge(action) {
    try {
        yield call(api.challenges.update, action.challenge);
        yield call(api.challengeAwards.bulkUpdate, action.awards);
        yield call(api.challenges.changeGoals, action.challenge.id, action.goals);
        yield put(updateChallengeSuccess())
    } catch(e) {
        yield put(updateChallengeError())
    }
}

function* watchChallengeUpdate() {
    yield takeEvery(types.UPDATE_CHALLENGE, updateChallenge)
}

export default watchChallengeUpdate