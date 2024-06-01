import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  createGoalAdviceListSuccess,
  createGoalAdviceListError,
} from './actions';
import { getCollaboratorGoalDetailSuccess } from '../../CollaboratorGoals/CollaboratorGoalDetail/actions';
import { getTeamCollaboratorGoalDetailSuccess } from '../../TeamCollaboratorGoals/TeamCollaboratorGoalDetail/actions';
import { getTeamGoalDetailSuccess } from '../../TeamGoals/TeamGoalDetail/actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* createGoalAdviceListByCollaboratorGoal(action) {
  try {
    yield call(
      api.collaboratorGoals.changeAdvices,
      action.goalId,
      action.advices,
    );
    const [
      { data: goal },
      { data: levels },
      { data: definition },
      { data: advices },
    ] = yield all([
      call(api.collaboratorGoalSummaries.detail, action.goalId),
      call(api.collaboratorGoals.levels, action.goalId),
      call(api.collaboratorGoals.definition, action.goalId),
      call(api.collaboratorGoals.advices, action.goalId),
    ]);
    goal.levels = levels;
    goal.definition = definition;
    goal.advices = advices;
    yield put(createGoalAdviceListSuccess());
    yield put(getCollaboratorGoalDetailSuccess(goal));
  } catch (e) {
    yield put(createGoalAdviceListError());
  }
}

function* createGoalAdviceListByTeamCollaboratorGoal(action) {
  try {
    yield call(
      api.teamCollaboratorGoals.changeAdvices,
      action.goalId,
      action.advices,
    );
    const [
      { data: goal },
      { data: levels },
      { data: definition },
      { data: advices },
    ] = yield all([
      call(api.teamCollaboratorGoalSummaries.detail, action.goalId),
      call(api.teamCollaboratorGoals.levels, action.goalId),
      call(api.teamCollaboratorGoals.definition, action.goalId),
      call(api.teamCollaboratorGoals.advices, action.goalId),
    ]);
    goal.levels = levels;
    goal.definition = definition;
    goal.advices = advices;
    yield put(createGoalAdviceListSuccess());
    yield put(getTeamCollaboratorGoalDetailSuccess(goal));
  } catch (e) {
    yield put(createGoalAdviceListError());
  }
}

function* createGoalAdviceListByTeamGoal(action) {
  try {
    yield call(api.teamGoals.changeAdvices, action.goalId, action.advices);
    const [
      { data: goal },
      { data: levels },
      { data: definition },
      { data: advices },
    ] = yield all([
      call(api.teamGoalSummaries.detail, action.goalId),
      call(api.teamGoals.levels, action.goalId),
      call(api.teamGoals.definition, action.goalId),
      call(api.teamGoals.advices, action.goalId),
    ]);
    goal.levels = levels;
    goal.definition = definition;
    goal.advices = advices;
    yield put(createGoalAdviceListSuccess());
    yield put(getTeamGoalDetailSuccess(goal));
  } catch (e) {
    yield put(createGoalAdviceListError());
  }
}

export function* watchGoalAdviceListCreationByCollaboratorGoal() {
  yield takeLatest(
    types.CREATE_GOAL_ADVICE_LIST_BY_COLLABORATOR_GOAL,
    createGoalAdviceListByCollaboratorGoal,
  );
}

export function* watchGoalAdviceListCreationByTeamCollaboratorGoal() {
  yield takeLatest(
    types.CREATE_GOAL_ADVICE_LIST_BY_TEAM_COLLABORATOR_GOAL,
    createGoalAdviceListByTeamCollaboratorGoal,
  );
}

export function* watchGoalAdviceListCreationByTeamGoal() {
  yield takeLatest(
    types.CREATE_GOAL_ADVICE_LIST_BY_TEAM_GOAL,
    createGoalAdviceListByTeamGoal,
  );
}
