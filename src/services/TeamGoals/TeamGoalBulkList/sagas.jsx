import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getTeamGoalBulkListSuccess,
  getTeamGoalBulkListError,
} from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getTeamGoalBulkList(action) {
  try {
    const goals = yield call(
      api.goalDefinitions.teamGoalsBulk,
      action.definitionId,
      action.dates,
    );
    yield put(getTeamGoalBulkListSuccess(goals));
  } catch (e) {
    yield put(getTeamGoalBulkListError());
  }
}

function* watchTeamGoalBulkList() {
  yield takeLatest(types.GET_TEAM_GOAL_BULK_LIST, getTeamGoalBulkList);
}

export default watchTeamGoalBulkList;
