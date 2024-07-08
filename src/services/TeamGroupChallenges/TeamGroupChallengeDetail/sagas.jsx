import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getTeamGroupChallengeDetailSuccess,
  getTeamGroupChallengeDetailError,
} from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getTeamGroupChallengeDetail(action) {
  try {
    const { data: challenge } = yield call(
      api.teamGroupChallengeSummaries.detail,
      action.id,
    );
    const { data: awards } = yield call(
      api.challenges.awards,
      challenge.sourceId,
    );
    challenge.awards = awards;
    yield put(getTeamGroupChallengeDetailSuccess(challenge));
  } catch (e) {
    yield put(getTeamGroupChallengeDetailError());
  }
}

function* watchTeamGroupChallengeDetail() {
  yield takeLatest(
    types.GET_TEAM_GROUP_CHALLENGE_DETAIL,
    getTeamGroupChallengeDetail,
  );
}

export default watchTeamGroupChallengeDetail;
