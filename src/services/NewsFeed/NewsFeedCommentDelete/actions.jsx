import * as types from './actionTypes';

export const deleteNewsFeedComment = (commentId) => {
  return {
    type: types.DELETE_NEWS_FEED_COMMENT,
    commentId,
  };
};

export const deleteNewsFeedCommentSuccess = () => {
  return {
    type: types.DELETE_NEWS_FEED_COMMENT_SUCCESS,
  };
};

export const deleteNewsFeedCommentError = () => {
  return {
    type: types.DELETE_NEWS_FEED_COMMENT_ERROR,
  };
};

export const deleteNewsFeedCommentClear = () => {
  return {
    type: types.DELETE_NEWS_FEED_COMMENT_CLEAR,
  };
};
