import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getBadgeLevelRemainingPointsSuccess,
  getBadgeLevelRemainingPointsError,
} from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getBadgeLevelRemainingPoints(action) {
  try {
    const { data: points } = yield call(
      api.periods.badgeLevelRemainingPoints,
      action.periodId,
    );
    yield put(getBadgeLevelRemainingPointsSuccess(points));
  } catch (e) {
    yield put(getBadgeLevelRemainingPointsError());
  }
}

function* watchBadgeLevelRemainingPoints() {
  yield takeLatest(
    types.GET_BADGE_LEVEL_REMAINING_POINTS,
    getBadgeLevelRemainingPoints,
  );
}

export default watchBadgeLevelRemainingPoints;
