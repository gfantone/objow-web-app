import { call, put, takeLatest } from 'redux-saga/effects';
import {
  createGoalDefinitionSuccess,
  createGoalDefinitionError,
} from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* createGoalDefinition(action) {
  try {
    const { data: definition } = yield call(
      api.goalDefinitions.create,
      action.definition,
    );
    yield put(createGoalDefinitionSuccess(definition));
  } catch (e) {
    yield put(createGoalDefinitionError());
  }
}

function* watchGoalDefinitionCreation() {
  yield takeLatest(types.CREATE_GOAL_DEFINITION, createGoalDefinition);
}

export default watchGoalDefinitionCreation;
