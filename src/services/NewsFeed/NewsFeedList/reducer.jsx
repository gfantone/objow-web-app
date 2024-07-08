import * as types from './actionTypes';
import initialState from '../../../store/initialState';

const NewsFeedList = (state = initialState.newsFeedList, action) => {
  switch (action.type) {
    case types.GET_NEWS_FEED_LIST:
      return { ...state, newsFeed: null, loading: true, hasError: false };

    case types.GET_NEWS_FEED_LIST_SUCCESS:
      return { ...state, posts: action.posts, loading: false, hasError: false };

    case types.GET_NEWS_FEED_LIST_ERROR:
      return { ...state, posts: null, loading: false, hasError: true };

    case types.GET_NEWS_FEED_LIST_CLEAR:
      return { ...state, posts: null, loading: false, hasError: false };

    default:
      return state;
  }
};

export default NewsFeedList;
