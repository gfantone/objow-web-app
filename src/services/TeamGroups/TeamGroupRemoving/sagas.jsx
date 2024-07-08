import { call, put, takeLatest } from 'redux-saga/effects';
import { removeTeamGroupSuccess, removeTeamGroupError } from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* removeTeamGroup(action) {
  try {
    yield call(api.teamGroups.delete, action.id);
    yield put(removeTeamGroupSuccess());
  } catch (e) {
    yield put(removeTeamGroupError());
  }
}

function* watchTeamGroupRemoving() {
  yield takeLatest(types.REMOVE_TEAM_GROUP, removeTeamGroup);
}

export default watchTeamGroupRemoving;
