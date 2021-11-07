import { call, put, takeEvery } from 'redux-saga/effects'
import {updateChallengeSuccess, updateChallengeError} from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'
import _ from 'lodash'

function* updateChallenge(action) {
    try {
        yield call(api.challenges.update, action.challengeFormData, action.challenge);

        action.awards.map((award, index) => {
            award.challenge = action.challenge.id
            award.rank = index
            if(award.reward) {
              award.reward = Object.assign(
                {},
                award.reward,
                {
                  image: _.get(award.reward, 'image.id', _.get(award.reward, 'image')),
                  description: typeof(award.reward.description) !== 'string' ? JSON.stringify(award.reward.description) : award.reward.description
                }
              )
            }
        });
        yield call(api.challenges.changeAwards, action.challenge.id, action.awards);
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
