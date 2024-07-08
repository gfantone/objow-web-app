import { call, put, takeLatest } from 'redux-saga/effects';
import { removeTeamSuccess, removeTeamError } from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* removeTeam(action) {
  try {
    yield call(api.teams.delete, action.id);
    yield put(removeTeamSuccess());
  } catch (e) {
    yield put(removeTeamError());
  }
}

function* watchTeamRemoving() {
  yield takeLatest(types.REMOVE_TEAM, removeTeam);
}

export default watchTeamRemoving;
