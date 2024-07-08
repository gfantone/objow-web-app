import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getTeamCollaboratorChallengeGoalListByTeamGroupSuccess,
  getTeamCollaboratorChallengeGoalListByTeamGroupError,
} from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getTeamCollaboratorChallengeGoalListByTeamGroup(action) {
  try {
    const { data: goals } = yield call(
      api.teamCollaboratorChallenges.goalsByTeamGroup,
      action.challengeId,
    );
    yield put(getTeamCollaboratorChallengeGoalListByTeamGroupSuccess(goals));
  } catch (e) {
    yield put(getTeamCollaboratorChallengeGoalListByTeamGroupError());
  }
}

function* watchTeamCollaboratorChallengeGoalListByTeamGroup() {
  yield takeLatest(
    types.GET_TEAM_COLLABORATOR_CHALLENGE_GOAL_LIST_BY_TEAM_GROUP,
    getTeamCollaboratorChallengeGoalListByTeamGroup,
  );
}

export default watchTeamCollaboratorChallengeGoalListByTeamGroup;
