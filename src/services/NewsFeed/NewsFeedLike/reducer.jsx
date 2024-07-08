import * as types from './actionTypes';
import initialState from '../../../store/initialState';

const NewsFeedLike = (state = initialState.newsFeedLike, action) => {
  switch (action.type) {
    case types.LIKE_NEWS_FEED:
      return { ...state, success: null, loading: true, hasError: false };

    case types.LIKE_NEWS_FEED_SUCCESS:
      return { ...state, success: true, loading: false, hasError: false };

    case types.LIKE_NEWS_FEED_ERROR:
      return { ...state, success: false, loading: false, hasError: true };

    case types.LIKE_NEWS_FEED_CLEAR:
      return { ...state, success: null, loading: false, hasError: false };

    default:
      return state;
  }
};

export default NewsFeedLike;
