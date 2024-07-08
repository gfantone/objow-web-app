import { call, put, takeLatest } from 'redux-saga/effects';
import {
  likeNewsFeedCommentSuccess,
  likeNewsFeedCommentError,
} from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* likeNewsFeedComment(action) {
  try {
    const endpoint = action.value ? 'like' : 'dislike';
    yield call(api.postComments[endpoint], action.comment);
    yield put(likeNewsFeedCommentSuccess());
  } catch (e) {
    yield put(likeNewsFeedCommentError());
  }
}

function* watchNewsFeedLike() {
  yield takeLatest(types.LIKE_NEWS_FEED_COMMENT, likeNewsFeedComment);
}

export default watchNewsFeedLike;
