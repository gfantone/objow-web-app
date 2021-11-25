import { call, put, takeEvery } from 'redux-saga/effects'
import { createChallengeSuccess, createChallengeError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'
import _ from 'lodash'
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
                  image: _.get(award.reward, 'image.id', _.get(award.reward, 'image')),
                  category: _.get(award.reward, 'category.id', _.get(award.reward, 'category')),
                  description: typeof(award.reward.description) !== 'string' ? JSON.stringify(award.reward.description) : award.reward.description
                }
              )
            }
        });
        action.goals.map(goal => {
            goal.challenge = challenge.id
        });

        yield call(api.challenges.changeAwards, challenge.id, action.awards);
        yield call(api.challenges.changeGoals, challenge.id, action.goals);
        yield put(createChallengeSuccess(challenge.id))
    } catch(e) {
        yield put(createChallengeError())
    }
}

function* watchChallengeCreation() {
    yield takeEvery(types.CREATE_CHALLENGE, createChallenge)
}

export default watchChallengeCreation
