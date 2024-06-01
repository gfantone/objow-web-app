import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getCollaboratorDataListSuccess,
  getCollaboratorDataListError,
} from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getCollaboratorDataList(action) {
  try {
    const endpoint = action.full
      ? api.collaboratorData.list
      : api.kpis.collaboratorData;

    const { data } = yield call(
      endpoint,
      action.kpiId,
      action.start,
      action.end,
      action.filters
    );
    yield put(getCollaboratorDataListSuccess(data));
  } catch (e) {
    yield put(getCollaboratorDataListError());
  }
}

function* watchCollaboratorGoalData() {
  yield takeLatest(types.GET_COLLABORATOR_DATA_LIST, getCollaboratorDataList);
}

export default watchCollaboratorGoalData;
