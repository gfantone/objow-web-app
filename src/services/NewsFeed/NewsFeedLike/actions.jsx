import * as types from './actionTypes';

export const likeNewsFeed = (post, value = true) => {
  return {
    type: types.LIKE_NEWS_FEED,
    post,
    value,
  };
};

export const likeNewsFeedSuccess = () => {
  return {
    type: types.LIKE_NEWS_FEED_SUCCESS,
  };
};

export const likeNewsFeedError = () => {
  return {
    type: types.LIKE_NEWS_FEED_ERROR,
  };
};

export const likeNewsFeedClear = () => {
  return {
    type: types.LIKE_NEWS_FEED_CLEAR,
  };
};
