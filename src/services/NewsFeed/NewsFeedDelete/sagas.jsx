import { call, put, takeLatest } from 'redux-saga/effects';
import { deleteNewsFeedSuccess, deleteNewsFeedError } from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* deleteNewsFeed(action) {
  try {
    yield call(api.posts.delete, action.postId);
    yield put(deleteNewsFeedSuccess());
  } catch (e) {
    yield put(deleteNewsFeedError());
  }
}

function* watchNewsFeedDelete() {
  yield takeLatest(types.DELETE_NEWS_FEED, deleteNewsFeed);
}

export default watchNewsFeedDelete;
