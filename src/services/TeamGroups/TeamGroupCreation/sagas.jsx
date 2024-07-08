import { all, call, put, takeLatest } from 'redux-saga/effects';
import { createTeamGroupSuccess, createTeamGroupError } from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* createTeamGroup(action) {
  try {
    const { data: teamGroup } = yield call(
      api.teamGroups.create,
      action.teamGroup,
    );
    yield all(
      action.collaborators.map((collaborator) =>
        call(api.users.updateTeamGroup, collaborator.id, teamGroup.id),
      ),
    );
    yield put(createTeamGroupSuccess());
  } catch (e) {
    yield put(createTeamGroupError());
  }
}

function* watchTeamGroupCreation() {
  yield takeLatest(types.CREATE_TEAM_GROUP, createTeamGroup);
}

export default watchTeamGroupCreation;
