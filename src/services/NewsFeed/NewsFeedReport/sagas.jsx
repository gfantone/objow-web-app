import { call, put, takeLatest } from 'redux-saga/effects';
import { reportNewsFeedSuccess, reportNewsFeedError } from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* reportNewsFeed(action) {
  try {
    yield call(api.posts.report, action.post);
    yield put(reportNewsFeedSuccess());
  } catch (e) {
    yield put(reportNewsFeedError());
  }
}

function* watchNewsFeedReport() {
  yield takeLatest(types.REPORT_NEWS_FEED, reportNewsFeed);
}

export default watchNewsFeedReport;
