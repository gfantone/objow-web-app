import * as types from './actionTypes';
import initialState from '../../../store/initialState';

const NewsFeedDelete = (state = initialState.newsFeedDelete, action) => {
  switch (action.type) {
    case types.DELETE_NEWS_FEED_COMMENT:
      return { ...state, success: null, loading: true, hasError: false };

    case types.DELETE_NEWS_FEED_COMMENT_SUCCESS:
      return { ...state, success: true, loading: false, hasError: false };

    case types.DELETE_NEWS_FEED_COMMENT_ERROR:
      return { ...state, success: false, loading: false, hasError: true };

    case types.DELETE_NEWS_FEED_COMMENT_CLEAR:
      return { ...state, success: null, loading: false, hasError: false };

    default:
      return state;
  }
};

export default NewsFeedDelete;
