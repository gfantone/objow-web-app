import * as types from './actionTypes';

export const createNewsFeed = (post) => {
  return {
    type: types.CREATE_NEWS_FEED,
    post,
  };
};

export const createNewsFeedSuccess = () => {
  return {
    type: types.CREATE_NEWS_FEED_SUCCESS,
  };
};

export const createNewsFeedError = () => {
  return {
    type: types.CREATE_NEWS_FEED_ERROR,
  };
};

export const createNewsFeedClear = () => {
  return {
    type: types.CREATE_NEWS_FEED_CLEAR,
  };
};
