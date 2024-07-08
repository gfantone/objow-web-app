import { call, put, takeLatest } from 'redux-saga/effects';
import { likeNewsFeedSuccess, likeNewsFeedError } from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* likeNewsFeed(action) {
  try {
    const endpoint = action.value ? 'like' : 'dislike';
    yield call(api.posts[endpoint], action.post);
    yield put(likeNewsFeedSuccess());
  } catch (e) {
    yield put(likeNewsFeedError());
  }
}

function* watchNewsFeedLike() {
  yield takeLatest(types.LIKE_NEWS_FEED, likeNewsFeed);
}

export default watchNewsFeedLike;
