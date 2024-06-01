import * as types from './actionTypes';
import initialState from '../../../store/initialState';

const TeamPointSummaryDetail = (
  state = initialState.teamPointSummaryDetail,
  action,
) => {
  switch (action.type) {
    case types.GET_TEAM_POINT_SUMMARY_DETAIL_BY_COLLABORATOR:
    case types.GET_TEAM_POINT_SUMMARY_DETAIL_BY_TEAM:
      return { ...state, summary: null, loading: true, hasError: false };

    case types.GET_TEAM_POINT_SUMMARY_DETAIL_SUCCESS:
      return {
        ...state,
        summary: action.summary,
        loading: false,
        hasError: false,
      };

    case types.GET_TEAM_POINT_SUMMARY_DETAIL_ERROR:
      return { ...state, summary: null, loading: false, hasError: true };

    default:
      return state;
  }
};

export default TeamPointSummaryDetail;
