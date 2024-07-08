import { call, put, takeLatest } from 'redux-saga/effects';
import { updateNewsFeedSuccess, updateNewsFeedError } from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* updateNewsFeed(action) {
  try {
    yield call(api.posts.update, action.postId, action.data);
    yield put(updateNewsFeedSuccess());
  } catch (e) {
    yield put(updateNewsFeedError());
  }
}

function* watchNewsFeedUpdate() {
  yield takeLatest(types.UPDATE_NEWS_FEED, updateNewsFeed);
}

export default watchNewsFeedUpdate;
