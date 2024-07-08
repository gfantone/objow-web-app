import { call, put, takeLatest } from 'redux-saga/effects';
import { updateChallengeSuccess, updateChallengeError } from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';
import _ from 'lodash';

function* updateChallenge(action) {
  try {
    yield call(
      api.challenges.update,
      action.challengeFormData,
      action.challenge,
    );
    if (action.awards) {
      action.awards.map((award, index) => {
        award.challenge = action.challenge.id;
        award.rank = index + 1;
        award.points = award.points === null || award.reward ? 0 : award.points;
        if (award.reward) {
          award.reward = Object.assign({}, award.reward, {
            image: _.get(
              award.reward,
              'image.id',
              _.get(award.reward, 'image'),
            ),
            category: _.get(
              award.reward,
              'category.id',
              _.get(award.reward, 'category'),
            ),
            description:
              typeof award.reward.description !== 'string'
                ? JSON.stringify(award.reward.description)
                : award.reward.description,
          });
        }
      });
    }

    if (action.awardsEqual === false) {
      yield call(
        api.challenges.changeAwards,
        action.challenge.id,
        action.awards,
      );
    }
    if (action.goalsEqual === false) {
      yield call(api.challenges.changeGoals, action.challenge.id, action.goals);
    }
    yield put(updateChallengeSuccess());
  } catch (e) {
    yield put(updateChallengeError());
  }
}

function* watchChallengeUpdate() {
  yield takeLatest(types.UPDATE_CHALLENGE, updateChallenge);
}

export default watchChallengeUpdate;
