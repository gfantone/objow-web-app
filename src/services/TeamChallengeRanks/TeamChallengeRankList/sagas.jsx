import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getTeamChallengeRankListSuccess,
  getTeamChallengeRankListError,
} from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getTeamChallengeRankList(action) {
  try {
    const { data: ranks } = yield call(
      api.teamChallenges.ranks,
      action.challengeId,
      action.page,
      action.teamGroup,
      action.search,
    );
    yield put(getTeamChallengeRankListSuccess(ranks));
  } catch (e) {
    yield put(getTeamChallengeRankListError());
  }
}

function* getTeamChallengeRankListByTeamGroup(action) {
  try {
    const { data: ranks } = yield call(
      api.teamChallenges.ranksByTeamGroup,
      action.challengeId,
      action.page,
      action.teamGroup,
      action.search,
    );
    yield put(getTeamChallengeRankListSuccess(ranks));
  } catch (e) {
    yield put(getTeamChallengeRankListError());
  }
}

export function* watchTeamChallengeRankList() {
  yield takeLatest(
    types.GET_TEAM_CHALLENGE_RANK_LIST,
    getTeamChallengeRankList,
  );
}

export function* watchTeamChallengeRankListByTeamGroup() {
  yield takeLatest(
    types.GET_TEAM_CHALLENGE_RANK_LIST_BY_TEAM_GROUP,
    getTeamChallengeRankListByTeamGroup,
  );
}
