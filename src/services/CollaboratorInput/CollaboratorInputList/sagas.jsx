import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getCollaboratorInputListSuccess,
  getCollaboratorInputListError,
} from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getCollaboratorInputList(action) {
  try {
    const { data } = yield call(
      api.collaboratorInput.list,
      action.kpiId,
      action.start,
      action.end,
      action.filters,
    );
    yield put(getCollaboratorInputListSuccess(data));
  } catch (e) {
    yield put(getCollaboratorInputListError());
  }
}

function* watchCollaboratorInputList() {
  yield takeLatest(types.GET_COLLABORATOR_INPUT_LIST, getCollaboratorInputList);
}

export default watchCollaboratorInputList;
