import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getTeamCollaboratorChallengeGoalListSuccess,
  getTeamCollaboratorChallengeGoalListError,
} from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getTeamCollaboratorChallengeGoalList(action) {
  try {
    const { data: goals } = yield call(
      api.teamCollaboratorChallenges.goals,
      action.challengeId,
    );
    yield put(getTeamCollaboratorChallengeGoalListSuccess(goals));
  } catch (e) {
    yield put(getTeamCollaboratorChallengeGoalListError());
  }
}

function* watchTeamCollaboratorChallengeGoalList() {
  yield takeLatest(
    types.GET_TEAM_COLLABORATOR_CHALLENGE_GOAL_LIST,
    getTeamCollaboratorChallengeGoalList,
  );
}

export default watchTeamCollaboratorChallengeGoalList;
