import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getCollaboratorChallengeListSuccess,
  getCollaboratorChallengeListError,
} from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getCollaboratorChallengeList(action) {
  try {
    const { data: challenges } = yield call(
      api.collaborators.collaboratorChallenges,
      action.collaboratorId,
      action.time,
      action.year,
      action.start,
      action.end,
      action.challengeType,
    );
    yield put(getCollaboratorChallengeListSuccess(challenges));
  } catch (e) {
    yield put(getCollaboratorChallengeListError());
  }
}

function* watchCollaboratorChallengeList() {
  yield takeLatest(
    types.GET_COLLABORATOR_CHALLENGE_LIST,
    getCollaboratorChallengeList,
  );
}

export default watchCollaboratorChallengeList;
