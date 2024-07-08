import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getTeamGroupBasedChallengeGoalListSuccess,
  getTeamGroupBasedChallengeGoalListError,
} from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getTeamGroupBasedChallengeGoalList(action) {
  try {
    const { data: goals } = yield call(
      api.teamGroupBasedChallenges.goals,
      action.challengeId,
    );
    yield put(getTeamGroupBasedChallengeGoalListSuccess(goals));
  } catch (e) {
    yield put(getTeamGroupBasedChallengeGoalListError());
  }
}

function* getTeamGroupBasedChallengeGoalListByTeamGroup(action) {
  try {
    const { data: goals } = yield call(
      api.teamGroupBasedChallenges.goalsByTeamGroup,
      action.challengeId,
    );
    yield put(getTeamGroupBasedChallengeGoalListSuccess(goals));
  } catch (e) {
    yield put(getTeamGroupBasedChallengeGoalListError());
  }
}

export function* watchTeamGroupBasedChallengeGoalList() {
  yield takeLatest(
    types.GET_TEAM_GROUP_BASED_CHALLENGE_GOAL_LIST,
    getTeamGroupBasedChallengeGoalList,
  );
}

export function* watchTeamGroupBasedChallengeGoalListByTeamGroup() {
  yield takeLatest(
    types.GET_TEAM_GROUP_BASED_CHALLENGE_GOAL_LIST_BY_TEAM_GROUP,
    getTeamGroupBasedChallengeGoalListByTeamGroup,
  );
}
