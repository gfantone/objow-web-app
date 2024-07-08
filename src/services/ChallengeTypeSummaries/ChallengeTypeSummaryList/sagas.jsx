import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getChallengeTypeSummaryListSuccess,
  getChallengeTypeSummaryListError,
} from './actions';
import * as actionTypes from './actionTypes';
import api from '../../../data/api/api';

function* getChallengeTypeSummaryList(action) {
  try {
    const { data: types } = yield call(
      api.periods.challengeTypeSummaries,
      action.periodId,
    );
    yield put(getChallengeTypeSummaryListSuccess(types));
  } catch (e) {
    yield put(getChallengeTypeSummaryListError());
  }
}

function* watchChallengeTypeSummaryList() {
  yield takeLatest(
    actionTypes.GET_CHALLENGE_TYPE_SUMMARY_LIST,
    getChallengeTypeSummaryList,
  );
}

export default watchChallengeTypeSummaryList;
