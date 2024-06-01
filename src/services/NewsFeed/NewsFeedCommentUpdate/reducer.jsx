import * as types from './actionTypes';
import initialState from '../../../store/initialState';

const NewsFeedCommentUpdate = (
  state = initialState.newsFeedCommentUpdate,
  action,
) => {
  switch (action.type) {
    case types.UPDATE_NEWS_FEED_COMMENT:
      return { ...state, success: null, loading: true, hasError: false };

    case types.UPDATE_NEWS_FEED_COMMENT_SUCCESS:
      return { ...state, success: true, loading: false, hasError: false };

    case types.UPDATE_NEWS_FEED_COMMENT_ERROR:
      return { ...state, success: false, loading: false, hasError: true };

    case types.UPDATE_NEWS_FEED_COMMENT_CLEAR:
      return { ...state, success: null, loading: false, hasError: false };

    default:
      return state;
  }
};

export default NewsFeedCommentUpdate;
