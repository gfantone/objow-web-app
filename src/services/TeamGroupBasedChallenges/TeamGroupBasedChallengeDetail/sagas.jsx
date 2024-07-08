import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getTeamGroupBasedChallengeDetailSuccess,
  getTeamGroupBasedChallengeDetailError,
} from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getTeamGroupBasedChallengeDetail(action) {
  try {
    const { data: challenge } = yield call(
      api.teamGroupBasedChallengeSummaries.detail,
      action.id,
    );
    const { data: awards } = yield call(
      api.challenges.awards,
      challenge.sourceId,
    );
    challenge.awards = awards;
    yield put(getTeamGroupBasedChallengeDetailSuccess(challenge));
  } catch (e) {
    yield put(getTeamGroupBasedChallengeDetailError());
  }
}

function* watchTeamGroupBasedChallengeDetail() {
  yield takeLatest(
    types.GET_TEAM_GROUP_BASED_CHALLENGE_DETAIL,
    getTeamGroupBasedChallengeDetail,
  );
}

export default watchTeamGroupBasedChallengeDetail;
