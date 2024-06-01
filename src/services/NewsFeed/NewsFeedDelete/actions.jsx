import * as types from './actionTypes';

export const deleteNewsFeed = (postId) => {
  return {
    type: types.DELETE_NEWS_FEED,
    postId,
  };
};

export const deleteNewsFeedSuccess = () => {
  return {
    type: types.DELETE_NEWS_FEED_SUCCESS,
  };
};

export const deleteNewsFeedError = () => {
  return {
    type: types.DELETE_NEWS_FEED_ERROR,
  };
};

export const deleteNewsFeedClear = () => {
  return {
    type: types.DELETE_NEWS_FEED_CLEAR,
  };
};
