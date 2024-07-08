import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  updateGoalDefinitionLevelListSuccess,
  updateGoalDefinitionLevelListError,
} from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* updateGoalDefinitionLevelList(action) {
  try {
    if (action.collaborator) {
      yield all(
        action.removedLevels.map((level) =>
          call(api.goalDefinitionLevelsByCollaborator.remove, level.id),
        ),
      );
      yield all(
        action.oldLevels.map((level) =>
          call(
            api.goalDefinitionLevelsByCollaborator.update,
            Object.assign(level, { collaborator_id: action.collaborator }),
          ),
        ),
      );
      yield all(
        action.newLevels.map((level) =>
          call(
            api.goalDefinitionLevelsByCollaborator.create,
            Object.assign(level, { collaborator_id: action.collaborator }),
          ),
        ),
      );
      yield put(updateGoalDefinitionLevelListSuccess());
    } else if (action.team) {
      yield all(
        action.removedLevels.map((level) =>
          call(api.goalDefinitionLevelsByTeam.remove, level.id),
        ),
      );
      yield all(
        action.oldLevels.map((level) =>
          call(
            api.goalDefinitionLevelsByTeam.update,
            Object.assign(level, { team_id: action.team }),
          ),
        ),
      );
      yield all(
        action.newLevels.map((level) =>
          call(
            api.goalDefinitionLevelsByTeam.create,
            Object.assign(level, { team_id: action.team }),
          ),
        ),
      );
      yield put(updateGoalDefinitionLevelListSuccess());
    } else {
      yield all(
        action.removedLevels.map((level) =>
          call(api.goalDefinitionLevels.remove, level.id),
        ),
      );
      yield all(
        action.oldLevels.map((level) =>
          call(api.goalDefinitionLevels.update, level),
        ),
      );
      yield all(
        action.newLevels.map((level) =>
          call(api.goalDefinitionLevels.create, level),
        ),
      );
      yield put(updateGoalDefinitionLevelListSuccess());
    }
  } catch (e) {
    yield put(updateGoalDefinitionLevelListError());
  }
}

function* watchGoalDefinitionLevelListUpdate() {
  yield takeLatest(
    types.UPDATE_GOAL_DEFINITION_LEVEL_LIST,
    updateGoalDefinitionLevelList,
  );
}

export default watchGoalDefinitionLevelListUpdate;
