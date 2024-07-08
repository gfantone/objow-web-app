import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getTeamGroupBasedChallengeRankListSuccess,
  getTeamGroupBasedChallengeRankListError,
} from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getTeamGroupBasedChallengeRankList(action) {
  try {
    const { data: ranks } = yield call(
      api.teamGroupBasedChallenges.ranks,
      action.challengeId,
      action.page,
    );
    yield put(getTeamGroupBasedChallengeRankListSuccess(ranks));
  } catch (e) {
    yield put(getTeamGroupBasedChallengeRankListError());
  }
}

function* getTeamGroupBasedChallengeRankListByTeamGroup(action) {
  try {
    const { data: ranks } = yield call(
      api.teamGroupBasedChallenges.ranksByTeamGroup,
      action.challengeId,
      action.page,
    );
    yield put(getTeamGroupBasedChallengeRankListSuccess(ranks));
  } catch (e) {
    yield put(getTeamGroupBasedChallengeRankListError());
  }
}

export function* watchTeamGroupBasedChallengeRankList() {
  yield takeLatest(
    types.GET_TEAM_GROUP_BASED_CHALLENGE_RANK_LIST,
    getTeamGroupBasedChallengeRankList,
  );
}

export function* watchTeamGroupBasedChallengeRankListByTeamGroup() {
  yield takeLatest(
    types.GET_TEAM_GROUP_BASED_CHALLENGE_RANK_LIST_BY_TEAM_GROUP,
    getTeamGroupBasedChallengeRankListByTeamGroup,
  );
}
