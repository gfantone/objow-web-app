import { call, put, takeLatest } from 'redux-saga/effects';
import { getManagerGoalListSuccess, getManagerGoalListError } from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* GetManagerGoalList(action) {
  try {
    const { data: goals } = yield call(
      api.teams.goals,
      action.id,
      action.current,
      action.category,
    );
    yield put(getManagerGoalListSuccess(goals));
  } catch (e) {
    yield put(getManagerGoalListError());
  }
}

function* watchManagerGoalList() {
  yield takeLatest(types.GET_MANAGER_GOAL_LIST, GetManagerGoalList);
}

export default watchManagerGoalList;
