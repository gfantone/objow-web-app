import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  getChallengeSummarySuccess,
  getChallengeSummaryError,
} from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getChallengeSummary(action) {
  try {
    const { data: summary } = yield call(
      api.challenges.summary,
      action.challenge_id,
      action.collaborator,
      action.team,
      action.team_group,
    );
    yield put(getChallengeSummarySuccess(summary));
  } catch (e) {
    yield put(getChallengeSummaryError());
  }
}

function* watchChallengeSummary() {
  yield takeLatest(types.GET_CHALLENGE_SUMMARY, getChallengeSummary);
}

export default watchChallengeSummary;
