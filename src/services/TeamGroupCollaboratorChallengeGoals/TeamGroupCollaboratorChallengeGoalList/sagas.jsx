import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getTeamGroupCollaboratorChallengeGoalListSuccess,
  getTeamGroupCollaboratorChallengeGoalListError,
} from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getTeamGroupCollaboratorChallengeGoalList(action) {
  try {
    const { data: goals } = yield call(
      api.teamGroupCollaboratorChallenges.goals,
      action.challengeId,
    );
    yield put(getTeamGroupCollaboratorChallengeGoalListSuccess(goals));
  } catch (e) {
    yield put(getTeamGroupCollaboratorChallengeGoalListError());
  }
}

function* watchTeamGroupCollaboratorChallengeGoalList() {
  yield takeLatest(
    types.GET_TEAM_GROUP_COLLABORATOR_CHALLENGE_GOAL_LIST,
    getTeamGroupCollaboratorChallengeGoalList,
  );
}

export default watchTeamGroupCollaboratorChallengeGoalList;
