import { all, call, put, takeLatest } from 'redux-saga/effects';
import { getTeamGroupListSuccess, getTeamGroupListError } from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getTeamGroupList(action) {
  try {
    var { data: teamGroups } = yield call(
      api.teamGroups.list,
      action.full,
      action.abortController,
    );
    yield put(getTeamGroupListSuccess(teamGroups));
  } catch (e) {
    yield put(getTeamGroupListError());
  }
}

function* watchTeamGroupList() {
  yield takeLatest(types.GET_TEAM_GROUP_LIST, getTeamGroupList);
}

export default watchTeamGroupList;
