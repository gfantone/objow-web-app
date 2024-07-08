import { call, put, takeLatest } from 'redux-saga/effects';
import {
  updateCollaboratorInputSuccess,
  updateCollaboratorInputError,
} from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* updateCollaboratorInput(action) {
  try {
    const endpoint =
      action.data instanceof Array
        ? api.collaboratorInput.bulkUpdate
        : api.collaboratorInput.update;
    yield call(api.collaboratorInput.bulkUpdate, action.data);
    yield put(updateCollaboratorInputSuccess());
  } catch (e) {
    yield put(updateCollaboratorInputError());
  }
}

function* watchCollaboratorInputUpdate() {
  yield takeLatest(types.UPDATE_COLLABORATOR_INPUT, updateCollaboratorInput);
}

export default watchCollaboratorInputUpdate;
