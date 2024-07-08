import * as types from './actionTypes';

export const getNewsFeedList = (options = {}) => ({
  type: types.GET_NEWS_FEED_LIST,
  ...options,
});

export const getNewsFeedListSuccess = (posts) => ({
  type: types.GET_NEWS_FEED_LIST_SUCCESS,
  posts,
});

export const getNewsFeedListError = () => ({
  type: types.GET_NEWS_FEED_LIST_ERROR,
});

export const getNewsFeedListClear = () => ({
  type: types.GET_NEWS_FEED_LIST_CLEAR,
});
