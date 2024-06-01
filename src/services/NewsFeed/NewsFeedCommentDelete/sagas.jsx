import { call, put, takeLatest } from 'redux-saga/effects';
import {
  deleteNewsFeedCommentSuccess,
  deleteNewsFeedCommentError,
} from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* deleteNewsFeedComment(action) {
  try {
    yield call(api.postComments.delete, action.commentId);
    yield put(deleteNewsFeedCommentSuccess());
  } catch (e) {
    yield put(deleteNewsFeedCommentError());
  }
}

function* watchNewsFeedDelete() {
  yield takeLatest(types.DELETE_NEWS_FEED_COMMENT, deleteNewsFeedComment);
}

export default watchNewsFeedDelete;
