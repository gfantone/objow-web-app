import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  updatePlayerGoalListSuccess,
  updatePlayerGoalListError,
} from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* updatePlayerGoalList(action) {
  try {
    yield call(api.collaboratorGoals.bulkUpdate, action.goals);
    yield put(updatePlayerGoalListSuccess());
  } catch (e) {
    yield put(updatePlayerGoalListError());
  }
}

function* watchPlayerGoalListUpdate() {
  yield takeLatest(types.UPDATE_PLAYER_GOAL_LIST, updatePlayerGoalList);
}

export default watchPlayerGoalListUpdate;
