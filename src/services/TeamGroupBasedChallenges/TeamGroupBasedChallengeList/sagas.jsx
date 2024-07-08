import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getTeamGroupBasedChallengeListSuccess,
  getTeamGroupBasedChallengeListError,
} from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getTeamGroupBasedChallengeListByCollaborator(action) {
  try {
    const { data: challenges } = yield call(
      api.collaborators.teamGroupBasedChallenges,
      action.collaboratorId,
      action.time,
      action.year,
      action.start,
      action.end,
      action.challengeType,
    );
    yield put(getTeamGroupBasedChallengeListSuccess(challenges));
  } catch (e) {
    yield put(getTeamGroupBasedChallengeListError());
  }
}

function* getTeamGroupBasedChallengeListByTeam(action) {
  try {
    const { data: challenges } = yield call(
      api.teams.teamGroupBasedChallenges,
      action.teamId,
      action.time,
      action.year,
      action.start,
      action.end,
      action.challengeType,
    );
    yield put(getTeamGroupBasedChallengeListSuccess(challenges));
  } catch (e) {
    yield put(getTeamGroupBasedChallengeListError());
  }
}

function* getTeamGroupBasedChallengeListByTeamGroup(action) {
  try {
    const { data: challenges } = yield call(
      api.teamGroups.teamGroupBasedChallenges,
      action.teamGroupId,
      action.time,
      action.year,
      action.start,
      action.end,
      action.challengeType,
    );
    yield put(getTeamGroupBasedChallengeListSuccess(challenges));
  } catch (e) {
    yield put(getTeamGroupBasedChallengeListError());
  }
}

export function* watchTeamGroupBasedChallengeListByCollaborator() {
  yield takeLatest(
    types.GET_TEAM_GROUP_BASED_CHALLENGE_LIST_BY_COLLABORATOR,
    getTeamGroupBasedChallengeListByCollaborator,
  );
}

export function* watchTeamGroupBasedChallengeListByTeam() {
  yield takeLatest(
    types.GET_TEAM_GROUP_BASED_CHALLENGE_LIST_BY_TEAM,
    getTeamGroupBasedChallengeListByTeam,
  );
}

export function* watchTeamGroupBasedChallengeListByTeamGroup() {
  yield takeLatest(
    types.GET_TEAM_GROUP_BASED_CHALLENGE_LIST_BY_TEAM_GROUP,
    getTeamGroupBasedChallengeListByTeamGroup,
  );
}
