import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getTeamPersonalizedChallengeListSuccess,
  getTeamPersonalizedChallengeListError,
} from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getTeamPersonalizedChallengeListByCollaborator(action) {
  try {
    const { data: challenges } = yield call(
      api.collaborators.teamPersonalizedChallenges,
      action.collaboratorId,
      action.time,
      action.year,
      action.start,
      action.end,
      action.challengeType,
    );
    yield put(getTeamPersonalizedChallengeListSuccess(challenges));
  } catch (e) {
    yield put(getTeamPersonalizedChallengeListError());
  }
}

function* getTeamPersonalizedChallengeListByTeam(action) {
  try {
    const { data: challenges } = yield call(
      api.teams.teamPersonalizedChallenges,
      action.teamId,
      action.time,
      action.year,
      action.start,
      action.end,
      action.challengeType,
    );
    yield put(getTeamPersonalizedChallengeListSuccess(challenges));
  } catch (e) {
    yield put(getTeamPersonalizedChallengeListError());
  }
}

function* getTeamPersonalizedChallengeListByTeamGroup(action) {
  try {
    const { data: challenges } = yield call(
      api.teamGroups.teamPersonalizedChallenges,
      action.teamGroupId,
      action.time,
      action.year,
      action.start,
      action.end,
      action.challengeType,
    );
    yield put(getTeamPersonalizedChallengeListSuccess(challenges));
  } catch (e) {
    yield put(getTeamPersonalizedChallengeListError());
  }
}

export function* watchTeamPersonalizedChallengeListByCollaborator() {
  yield takeLatest(
    types.GET_TEAM_PERSONALIZED_CHALLENGE_LIST_BY_COLLABORATOR,
    getTeamPersonalizedChallengeListByCollaborator,
  );
}

export function* watchTeamPersonalizedChallengeListByTeam() {
  yield takeLatest(
    types.GET_TEAM_PERSONALIZED_CHALLENGE_LIST_BY_TEAM,
    getTeamPersonalizedChallengeListByTeam,
  );
}
export function* watchTeamPersonalizedChallengeListByTeamGroup() {
  yield takeLatest(
    types.GET_TEAM_PERSONALIZED_CHALLENGE_LIST_BY_TEAM_GROUP,
    getTeamPersonalizedChallengeListByTeamGroup,
  );
}
