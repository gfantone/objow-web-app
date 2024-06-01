import { call, put, takeLatest } from 'redux-saga/effects';
import {
  updateNewsFeedCommentSuccess,
  updateNewsFeedCommentError,
} from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* updateNewsFeedComment(action) {
  try {
    yield call(api.postComments.update, action.comment);
    yield put(updateNewsFeedCommentSuccess());
  } catch (e) {
    yield put(updateNewsFeedCommentError());
  }
}

function* watchNewsFeedUpdate() {
  yield takeLatest(types.UPDATE_NEWS_FEED_COMMENT, updateNewsFeedComment);
}

export default watchNewsFeedUpdate;
