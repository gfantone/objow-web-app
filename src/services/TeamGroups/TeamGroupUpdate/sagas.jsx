import { all, call, put, takeLatest } from 'redux-saga/effects';
import { updateTeamGroupSuccess, updateTeamGroupError } from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* updateTeamGroup(action) {
  try {
    const { data: teamGroup } = yield call(
      api.teamGroups.update,
      action.teamGroup
    );
    yield all(
      action.oldCollaborators.map((collaborator) =>
        call(api.users.updateTeamGroup, collaborator, null)
      )
    );
    yield all(
      action.newCollaborators.map((collaborator) =>
        call(api.users.updateTeamGroup, collaborator, action.teamGroup.id)
      )
    );
    yield put(updateTeamGroupSuccess());
  } catch (e) {
    yield put(updateTeamGroupError());
  }
}

function* watchTeamGroupUpdate() {
  yield takeLatest(types.UPDATE_TEAM_GROUP, updateTeamGroup);
}

export default watchTeamGroupUpdate;
