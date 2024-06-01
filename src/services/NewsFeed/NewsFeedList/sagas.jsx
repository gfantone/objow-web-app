import { call, put, takeLatest } from 'redux-saga/effects';
import { getNewsFeedListSuccess, getNewsFeedListError } from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getNewsFeedList(action) {
  try {
    const { data: posts } = yield call(
      api.posts.list,
      action.page,
      action.smallPages
    );
    yield put(getNewsFeedListSuccess(posts));
  } catch (e) {
    yield put(getNewsFeedListError());
  }
}

function* watchNewsFeedList() {
  yield takeLatest(types.GET_NEWS_FEED_LIST, getNewsFeedList);
}

export default watchNewsFeedList;
