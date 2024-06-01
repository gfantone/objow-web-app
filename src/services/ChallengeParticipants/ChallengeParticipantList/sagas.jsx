import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getChallengeParticipantListSuccess,
  getChallengeParticipantListError,
} from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getChallengeParticipantList(action) {
  try {
    var { data: participants } = yield call(
      api.challenges.participants,
      action.id
    );
    yield put(getChallengeParticipantListSuccess(participants));
  } catch (e) {
    yield put(getChallengeParticipantListError());
  }
}

function* getChallengeParticipantCollaboratorList(action) {
  try {
    var { data: participants } = yield call(
      api.challenges.participant_collaborators,
      action.challengeId,
      action.search,
      action.page
    );
    yield put(getChallengeParticipantListSuccess(participants));
  } catch (e) {
    yield put(getChallengeParticipantListError());
  }
}

export function* watchChallengeParticipantList() {
  yield takeLatest(
    types.GET_CHALLENGE_PARTICIPANT_LIST,
    getChallengeParticipantList
  );
}

export function* watchChallengeParticipantCollaboratorsList() {
  yield takeLatest(
    types.GET_CHALLENGE_PARTICIPANT_COLLABORATOR_LIST,
    getChallengeParticipantCollaboratorList
  );
}
