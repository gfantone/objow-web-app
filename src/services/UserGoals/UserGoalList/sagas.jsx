import { call, put, takeLatest } from 'redux-saga/effects';
import { getUserGoalListSuccess, getUserGoalListError } from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getUserGoalList(action) {
  try {
    let { data: goals } = yield call(
      api.userGoals.list,
      action.inProgress,
      action.team,
      action.category,
      action.date,
    );
    yield put(getUserGoalListSuccess(goals));
  } catch (e) {
    yield put(getUserGoalListError());
  }
}

function* watchUserGoalList() {
  yield takeLatest(types.GET_USER_GOAL_LIST, getUserGoalList);
}

export default watchUserGoalList;
