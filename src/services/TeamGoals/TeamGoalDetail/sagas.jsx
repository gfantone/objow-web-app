import { all, call, put, takeLatest } from 'redux-saga/effects';
import { getTeamGoalDetailSuccess, getTeamGoalDetailError } from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getTeamGoalDetail(action) {
  try {
    const [
      { data: goal },
      { data: levels },
      { data: definition },
      { data: advices },
    ] = yield all([
      call(api.teamGoalSummaries.detail, action.id),
      call(api.teamGoals.levels, action.id),
      call(api.teamGoals.definition, action.id),
      call(api.teamGoals.advices, action.id),
    ]);
    goal.levels = levels;
    goal.definition = definition;
    goal.advices = advices;
    yield put(getTeamGoalDetailSuccess(goal));
  } catch (e) {
    yield put(getTeamGoalDetailError());
  }
}

function* watchTeamGoalDetail() {
  yield takeLatest(types.GET_TEAM_GOAL_DETAIL, getTeamGoalDetail);
}

export default watchTeamGoalDetail;
