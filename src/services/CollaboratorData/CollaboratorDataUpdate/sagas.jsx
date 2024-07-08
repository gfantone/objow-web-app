import { call, put, takeLatest } from 'redux-saga/effects';
import {
  updateCollaboratorDataSuccess,
  updateCollaboratorDataError,
} from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* updateCollaboratorData(action) {
  try {
    yield call(api.collaboratorData.bulkUpdate, action.data);
    yield put(updateCollaboratorDataSuccess());
  } catch (e) {
    yield put(updateCollaboratorDataError());
  }
}

function* watchCollaboratorDataUpdate() {
  yield takeLatest(types.UPDATE_COLLABORATOR_DATA, updateCollaboratorData);
}

export default watchCollaboratorDataUpdate;
