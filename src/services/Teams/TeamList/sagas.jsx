import { all, call, put, takeLatest } from 'redux-saga/effects';
import { getTeamListSuccess, getTeamListError } from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getTeamList(action) {
  try {
    var { data: teams } = yield call(
      api.teams.list,
      action.full,
      action.teamGroup,
      action.nestedCollaborators,
      action.abortController
    );

    if (!action.disableCollaborators && !action.nestedCollaborators) {
      const collaboratorList = yield all(
        teams.map((team) =>
          call(api.teams.collaborators, team.id, {
            simpleCollaborators: action.simpleCollaborators,
            listCollaborators: action.listCollaborators,
          })
        )
      );
      teams.map((team) => {
        var index = teams.indexOf(team);
        team.collaborators = collaboratorList[index].data;
      });
    }
    yield put(getTeamListSuccess(teams));
  } catch (e) {
    yield put(getTeamListError());
  }
}

function* watchTeamList() {
  yield takeLatest(types.GET_TEAM_LIST, getTeamList);
}

export default watchTeamList;
