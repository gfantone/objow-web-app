import * as types from './actionTypes';

export const createNewsFeedComment = (postId, comment) => {
  return {
    type: types.CREATE_NEWS_FEED_COMMENT,
    postId,
    comment,
  };
};

export const createNewsFeedCommentSuccess = () => {
  return {
    type: types.CREATE_NEWS_FEED_COMMENT_SUCCESS,
  };
};

export const createNewsFeedCommentError = () => {
  return {
    type: types.CREATE_NEWS_FEED_COMMENT_ERROR,
  };
};

export const createNewsFeedCommentClear = () => {
  return {
    type: types.CREATE_NEWS_FEED_COMMENT_CLEAR,
  };
};
