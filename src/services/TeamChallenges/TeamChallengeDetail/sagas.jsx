import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getTeamChallengeDetailSuccess,
  getTeamChallengeDetailError,
} from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getTeamChallengeDetail(action) {
  try {
    const { data: challenge } = yield call(
      api.teamChallengeSummaries.detail,
      action.id,
    );
    const { data: awards } = yield call(
      api.challenges.awards,
      challenge.sourceId,
    );
    challenge.awards = awards;
    yield put(getTeamChallengeDetailSuccess(challenge));
  } catch (e) {
    yield put(getTeamChallengeDetailError());
  }
}

function* watchTeamChallengeDetail() {
  yield takeLatest(types.GET_TEAM_CHALLENGE_DETAIL, getTeamChallengeDetail);
}

export default watchTeamChallengeDetail;
