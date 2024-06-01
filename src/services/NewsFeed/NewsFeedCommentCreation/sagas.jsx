import { call, put, takeLatest } from 'redux-saga/effects';
import {
  createNewsFeedCommentSuccess,
  createNewsFeedCommentError,
} from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* createNewsFeedComment(action) {
  try {
    yield call(api.posts.comment, action.postId, action.comment);
    yield put(createNewsFeedCommentSuccess());
  } catch (e) {
    yield put(createNewsFeedCommentError());
  }
}

function* watchNewsFeedCommentCreation() {
  yield takeLatest(types.CREATE_NEWS_FEED_COMMENT, createNewsFeedComment);
}

export default watchNewsFeedCommentCreation;
