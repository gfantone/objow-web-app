import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getTeamPlayerGoalBulkListSuccess,
  getTeamPlayerGoalBulkListError,
} from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getTeamPlayerGoalBulkList(action) {
  try {
    const goals = yield call(
      api.goalDefinitions.teamCollaboratorGoalsBulk,
      action.definitionId,
      action.dates,
    );
    yield put(getTeamPlayerGoalBulkListSuccess(goals));
  } catch (e) {
    yield put(getTeamPlayerGoalBulkListError());
  }
}

function* watchTeamPlayerGoalBulkList() {
  yield takeLatest(
    types.GET_TEAM_PLAYER_GOAL_BULK_LIST,
    getTeamPlayerGoalBulkList,
  );
}

export default watchTeamPlayerGoalBulkList;
