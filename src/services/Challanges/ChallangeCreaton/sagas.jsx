import { call, put, takeEvery } from 'redux-saga/effects'
import { createChallengeSuccess, createChallengeError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* createChallenge(action) {
    try {

        const { data: challenge } = yield call(api.challenges.create, action.challengeFormData, action.teamId);

        action.awards.map((award, index) => {
            award.challenge = challenge.id
            award.rank = index + 1
            if(award.reward) {
              award.reward = Object.assign(
                {},
                award.reward,
                {
                  description: JSON.stringify(award.reward.description)
                }
              )
            }
        });
        action.goals.map(goal => {
            goal.challenge = challenge.id
        });
        yield call(api.challenges.changeAwards, challenge.id, action.awards);
        yield call(api.challenges.changeGoals, challenge.id, action.goals);
        yield put(createChallengeSuccess())
    } catch(e) {
        yield put(createChallengeError())
    }
}

function* watchChallengeCreation() {
    yield takeEvery(types.CREATE_CHALLENGE, createChallenge)
}

export default watchChallengeCreation
