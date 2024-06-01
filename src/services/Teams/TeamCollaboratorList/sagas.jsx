import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  getTeamCollaboratorListSuccess,
  getTeamCollaboratorListError,
} from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getTeamCollaboratorList(action) {
  try {
    let endpoint = api.teams.collaborators;
    let id = action.teamId;
    if (action.teamGroupId) {
      endpoint = api.teamGroups.collaborators;
      id = action.teamGroupId;
    }
    var { data: collaborators } = yield call(endpoint, id, {
      collaboratorIds: action.collaboratorIds,
      simpleCollaborators: action.simpleCollaborators,
      listCollaborators: action.listCollaborators,
      abortController: action.abortController,
      limit: action.limit,
      orderBy: action.orderBy,
      search: action.search,
    });
    yield put(getTeamCollaboratorListSuccess(collaborators));
  } catch (e) {
    yield put(getTeamCollaboratorListError());
  }
}

function* watchTeamCollaboratorList() {
  yield takeLatest(types.GET_TEAM_COLLABORATOR_LIST, getTeamCollaboratorList);
}

export default watchTeamCollaboratorList;
