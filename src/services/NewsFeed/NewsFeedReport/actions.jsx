import * as types from './actionTypes';

export const reportNewsFeed = (post, value = true) => {
  return {
    type: types.REPORT_NEWS_FEED,
    post,
    value,
  };
};

export const reportNewsFeedSuccess = () => {
  return {
    type: types.REPORT_NEWS_FEED_SUCCESS,
  };
};

export const reportNewsFeedError = () => {
  return {
    type: types.REPORT_NEWS_FEED_ERROR,
  };
};

export const reportNewsFeedClear = () => {
  return {
    type: types.REPORT_NEWS_FEED_CLEAR,
  };
};
