import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getGoalDefinitionLevelCollaboratorPointsSuccess,
  getGoalDefinitionLevelCollaboratorPointsError,
} from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getGoalDefinitionLevelCollaboratorPoints(action) {
  try {
    const { data: usedPoints } = yield call(
      api.periods.collaboratorGoalUsedPoints,
      action.periodId,
    );
    const { data: currentPoints } = yield call(
      api.periods.collaboratorGoalCurrentPoints,
      action.periodId,
    );

    yield put(
      getGoalDefinitionLevelCollaboratorPointsSuccess({
        usedPoints,
        currentPoints,
      }),
    );
  } catch (e) {
    yield put(getGoalDefinitionLevelCollaboratorPointsError());
  }
}

function* getGoalDefinitionLevelCollaboratorPointsByCollaborator(action) {
  try {
    const { data: usedPoints } = yield call(
      api.periods.collaboratorGoalUsedPoints,
      action.periodId,
      null,
      action.collaboratorId,
    );
    const { data: currentPoints } = yield call(
      api.periods.collaboratorGoalCurrentPoints,
      action.periodId,
      null,
      action.collaboratorId,
    );

    yield put(
      getGoalDefinitionLevelCollaboratorPointsSuccess({
        usedPoints,
        currentPoints,
      }),
    );
  } catch (e) {
    yield put(getGoalDefinitionLevelCollaboratorPointsError());
  }
}

function* getGoalDefinitionLevelCollaboratorPointsByTeam(action) {
  try {
    const { data: usedPoints } = yield call(
      api.periods.collaboratorGoalUsedPoints,
      action.periodId,
      action.teamId,
      null,
    );
    const { data: currentPoints } = yield call(
      api.periods.collaboratorGoalCurrentPoints,
      action.periodId,
      action.teamId,
      null,
    );
    yield put(
      getGoalDefinitionLevelCollaboratorPointsSuccess({
        usedPoints,
        currentPoints,
      }),
    );
  } catch (e) {
    yield put(getGoalDefinitionLevelCollaboratorPointsError());
  }
}

export function* watchGoalDefinitionLevelCollaboratorPoints() {
  yield takeLatest(
    types.GET_GOAL_DEFINITION_LEVEL_COLLABORATOR_POINTS,
    getGoalDefinitionLevelCollaboratorPoints,
  );
}
export function* watchGoalDefinitionLevelCollaboratorPointsByCollaborator() {
  yield takeLatest(
    types.GET_GOAL_DEFINITION_LEVEL_COLLABORATOR_POINTS_BY_COLLABORATOR,
    getGoalDefinitionLevelCollaboratorPointsByCollaborator,
  );
}
export function* watchGoalDefinitionLevelCollaboratorPointsByTeam() {
  yield takeLatest(
    types.GET_GOAL_DEFINITION_LEVEL_COLLABORATOR_POINTS_BY_TEAM,
    getGoalDefinitionLevelCollaboratorPointsByTeam,
  );
}
