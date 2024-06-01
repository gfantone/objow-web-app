import * as types from './actionTypes';

export const updateNewsFeedComment = (comment) => {
  return {
    type: types.UPDATE_NEWS_FEED_COMMENT,
    comment,
  };
};

export const updateNewsFeedCommentSuccess = () => {
  return {
    type: types.UPDATE_NEWS_FEED_COMMENT_SUCCESS,
  };
};

export const updateNewsFeedCommentError = () => {
  return {
    type: types.UPDATE_NEWS_FEED_COMMENT_ERROR,
  };
};

export const updateNewsFeedCommentClear = () => {
  return {
    type: types.UPDATE_NEWS_FEED_COMMENT_CLEAR,
  };
};
