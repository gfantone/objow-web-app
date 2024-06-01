import { call, put, takeLatest } from 'redux-saga/effects';
import {
  reportNewsFeedCommentSuccess,
  reportNewsFeedCommentError,
} from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* reportNewsFeedComment(action) {
  try {
    yield call(api.postComments.report, action.comment);
    yield put(reportNewsFeedCommentSuccess());
  } catch (e) {
    yield put(reportNewsFeedCommentError());
  }
}

function* watchNewsFeedReport() {
  yield takeLatest(types.REPORT_NEWS_FEED_COMMENT, reportNewsFeedComment);
}

export default watchNewsFeedReport;
