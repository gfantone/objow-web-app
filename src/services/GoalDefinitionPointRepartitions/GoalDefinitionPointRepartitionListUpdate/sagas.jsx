import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  updateGoalDefinitionPointRepartitionListSuccess,
  updateGoalDefinitionPointRepartitionListError,
} from './actions';
import * as actionTypes from './actionTypes';
import api from '../../../data/api/api';

function* updateGoalDefinitionPointRepartitionList(action) {
  try {
    yield all(
      action.pointRepartitions.map((pointRepartition) =>
        call(api.goalDefinitionPointRepartitions.update, pointRepartition),
      ),
    );
    yield put(updateGoalDefinitionPointRepartitionListSuccess());
  } catch (e) {
    yield put(updateGoalDefinitionPointRepartitionListError());
  }
}

function* watchGoalDefinitionPointRepartitionListUpdate() {
  yield takeLatest(
    actionTypes.UPDATE_GOAL_DEFINITION_POINT_REPARTITION_LIST,
    updateGoalDefinitionPointRepartitionList,
  );
}

export default watchGoalDefinitionPointRepartitionListUpdate;
