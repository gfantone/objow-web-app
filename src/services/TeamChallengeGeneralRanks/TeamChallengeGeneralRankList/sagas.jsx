import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getTeamChallengeGeneralRankListSuccess,
  getTeamChallengeGeneralRankListError,
} from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getTeamChallengeGeneralRankList(action) {
  try {
    const { data: ranks } = yield call(
      api.periods.teamChallengeRanking,
      action.periodId,
    );
    yield put(getTeamChallengeGeneralRankListSuccess(ranks));
  } catch (e) {
    yield put(getTeamChallengeGeneralRankListError());
  }
}

function* watchTeamChallengeGeneralRankList() {
  yield takeLatest(
    types.GET_TEAM_CHALLENGE_GENERAL_RANK_LIST,
    getTeamChallengeGeneralRankList,
  );
}

export default watchTeamChallengeGeneralRankList;
