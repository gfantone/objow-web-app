import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  getCollaboratorBadgeSummarySuccess,
  getCollaboratorBadgeSummaryError,
} from './actions';
import { getCollaboratorDetailSuccess } from '../../Collaborators/CollaboratorDetail/actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getCollaboratorBadgeSummary(action) {
  try {
    var [{ data: summary }, { data: collaborators }] = yield all([
      call(api.collaboratorBadgeSummary.detail, action.id),
      call(api.collaboratorBadgeSummary.collaborators, action.id),
    ]);
    summary.collaborators = collaborators;
    const { data: collaborator } = yield call(
      api.collaborators.detail,
      summary.collaboratorId,
    );
    yield put(getCollaboratorBadgeSummarySuccess(summary));
    yield put(getCollaboratorDetailSuccess(collaborator));
  } catch (e) {
    yield put(getCollaboratorBadgeSummaryError());
  }
}

function* watchCollaboratorBadgeSummaryDetail() {
  yield takeLatest(
    types.GET_COLLABORATOR_BADGE_SUMMARY,
    getCollaboratorBadgeSummary,
  );
}

export default watchCollaboratorBadgeSummaryDetail;
