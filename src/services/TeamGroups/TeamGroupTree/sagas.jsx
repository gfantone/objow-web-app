import { all, call, put, takeLatest } from 'redux-saga/effects';
import { getTeamGroupTreeSuccess, getTeamGroupTreeError } from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getTeamGroupTree(action) {
  try {
    var { data: teamGroup } = yield call(
      api.teamGroups.tree,
      action.full,
      action.admin,
      action.abortController,
    );
    yield put(getTeamGroupTreeSuccess(teamGroup));
  } catch (e) {
    yield put(getTeamGroupTreeError());
  }
}

function* watchTeamGroupTree() {
  yield takeLatest(types.GET_TEAM_GROUP_TREE, getTeamGroupTree);
}

export default watchTeamGroupTree;
