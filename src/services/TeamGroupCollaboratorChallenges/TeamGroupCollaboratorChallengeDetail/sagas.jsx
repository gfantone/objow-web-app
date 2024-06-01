import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getTeamGroupCollaboratorChallengeDetailSuccess,
  getTeamGroupCollaboratorChallengeDetailError,
} from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getTeamGroupCollaboratorChallengeDetail(action) {
  try {
    const { data: challenge } = yield call(
      api.teamGroupCollaboratorChallengeSummaries.detail,
      action.id,
    );
    const { data: awards } = yield call(
      api.challenges.awards,
      challenge.sourceId,
    );
    const { data: participants } = yield call(
      api.challenges.participants,
      challenge.sourceId,
      true,
    );

    challenge.awards = awards;
    challenge.participantIds = participants;
    yield put(getTeamGroupCollaboratorChallengeDetailSuccess(challenge));
  } catch (e) {
    yield put(getTeamGroupCollaboratorChallengeDetailError());
  }
}

function* watchTeamGroupCollaboratorChallengeDetail() {
  yield takeLatest(
    types.GET_TEAM_GROUP_COLLABORATOR_CHALLENGE_DETAIL,
    getTeamGroupCollaboratorChallengeDetail,
  );
}

export default watchTeamGroupCollaboratorChallengeDetail;
