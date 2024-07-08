import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getCollaboratorGeneralRankDetailSuccess,
  getCollaboratorGeneralRankDetailError,
} from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getCollaboratorGeneralRankDetail(action) {
  try {
    const { data: rank } = yield call(
      api.collaborators.generalRank,
      action.collaboratorId,
      action.year,
    );
    yield put(getCollaboratorGeneralRankDetailSuccess(rank));
  } catch (e) {
    yield put(getCollaboratorGeneralRankDetailError());
  }
}

function* watchCollaboratorGeneralRankDetail() {
  yield takeLatest(
    types.GET_COLLABORATOR_GENERAL_RANK_DETAIL,
    getCollaboratorGeneralRankDetail,
  );
}

export default watchCollaboratorGeneralRankDetail;
