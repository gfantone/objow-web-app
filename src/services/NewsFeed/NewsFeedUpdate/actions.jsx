import * as types from './actionTypes';

export const updateNewsFeed = (postId, data) => {
  return {
    type: types.UPDATE_NEWS_FEED,
    postId,
    data,
  };
};

export const updateNewsFeedSuccess = () => {
  return {
    type: types.UPDATE_NEWS_FEED_SUCCESS,
  };
};

export const updateNewsFeedError = () => {
  return {
    type: types.UPDATE_NEWS_FEED_ERROR,
  };
};

export const updateNewsFeedClear = () => {
  return {
    type: types.UPDATE_NEWS_FEED_CLEAR,
  };
};
