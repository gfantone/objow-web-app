import { call, put, takeLatest } from 'redux-saga/effects';
import {
  createCollaboratorInputSuccess,
  createCollaboratorInputError,
} from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* createCollaboratorInput(action) {
  try {
    const { data: input } = yield call(
      api.collaboratorInput.create,
      action.input,
    );
    yield put(createCollaboratorInputSuccess(input));
  } catch (e) {
    yield put(createCollaboratorInputError());
  }
}

function* watchCollaboratorInputCreation() {
  yield takeLatest(types.CREATE_COLLABORATOR_INPUT, createCollaboratorInput);
}

export default watchCollaboratorInputCreation;
