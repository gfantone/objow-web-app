import * as types from './actionTypes';

export const reportNewsFeedComment = (comment, value = true) => {
  return {
    type: types.REPORT_NEWS_FEED_COMMENT,
    comment,
    value,
  };
};

export const reportNewsFeedCommentSuccess = () => {
  return {
    type: types.REPORT_NEWS_FEED_COMMENT_SUCCESS,
  };
};

export const reportNewsFeedCommentError = () => {
  return {
    type: types.REPORT_NEWS_FEED_COMMENT_ERROR,
  };
};

export const reportNewsFeedCommentClear = () => {
  return {
    type: types.REPORT_NEWS_FEED_COMMENT_CLEAR,
  };
};
