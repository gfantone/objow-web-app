import { call, put, takeLatest } from 'redux-saga/effects';
import { deleteChallengeSuccess, deleteChallengeError } from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* deleteChallenge(action) {
  try {
    yield call(api.challenges.delete, action.challenge);
    yield put(deleteChallengeSuccess());
  } catch (e) {
    yield put(deleteChallengeError());
  }
}

function* watchChallengeDelete() {
  yield takeLatest(types.DELETE_CHALLENGE, deleteChallenge);
}

export default watchChallengeDelete;
