import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  updateTeamPlayerGoalListSuccess,
  updateTeamPlayerGoalListError,
} from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* updateTeamPlayerGoalList(action) {
  try {
    yield all(
      action.goals.map((goal) =>
        call(api.teamCollaboratorGoals.update, goal.id, goal.target),
      ),
    );
    yield put(updateTeamPlayerGoalListSuccess());
  } catch (e) {
    yield put(updateTeamPlayerGoalListError());
  }
}

function* watchTeamPlayerGoalListUpdate() {
  yield takeLatest(
    types.UPDATE_TEAM_PLAYER_GOAL_LIST,
    updateTeamPlayerGoalList,
  );
}

export default watchTeamPlayerGoalListUpdate;
