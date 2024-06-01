import * as types from './actionTypes';

export const likeNewsFeedComment = (comment, value = true) => {
  return {
    type: types.LIKE_NEWS_FEED_COMMENT,
    comment,
    value,
  };
};

export const likeNewsFeedCommentSuccess = () => {
  return {
    type: types.LIKE_NEWS_FEED_COMMENT_SUCCESS,
  };
};

export const likeNewsFeedCommentError = () => {
  return {
    type: types.LIKE_NEWS_FEED_COMMENT_ERROR,
  };
};

export const likeNewsFeedCommentClear = () => {
  return {
    type: types.LIKE_NEWS_FEED_COMMENT_CLEAR,
  };
};
