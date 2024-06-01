import { call, put, takeLatest } from 'redux-saga/effects';
import { createNewsFeedSuccess, createNewsFeedError } from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* createNewsFeed(action) {
  try {
    yield call(api.posts.create, action.post);
    yield put(createNewsFeedSuccess());
  } catch (e) {
    yield put(createNewsFeedError());
  }
}

function* watchNewsFeedCreation() {
  yield takeLatest(types.CREATE_NEWS_FEED, createNewsFeed);
}

export default watchNewsFeedCreation;
