import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let ChallengeSummary = (state = initialState.challengeSummary, action) => {
  switch (action.type) {
    case types.GET_CHALLENGE_SUMMARY:
      return { ...state, summary: null, loading: true, hasError: false };

    case types.GET_CHALLENGE_SUMMARY_SUCCESS:
      return {
        ...state,
        summary: action.summary,
        loading: false,
        hasError: false,
      };

    case types.GET_CHALLENGE_SUMMARY_ERROR:
      return { ...state, summary: null, loading: false, hasError: true };

    case types.GET_CHALLENGE_SUMMARY_CLEAR:
      return { ...state, summary: null, loading: false, hasError: false };

    default:
      return state;
  }
};

export default ChallengeSummary;
