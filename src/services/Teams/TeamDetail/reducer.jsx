import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let TeamDetail = (state = initialState.teamDetail, action) => {
  switch (action.type) {
    case types.GET_TEAM_DETAIL:
    case types.GET_TEAM_DETAIL_BY_ACCOOUNT:
      return { ...state, team: null, loading: true, hasError: false };

    case types.GET_TEAM_DETAIL_SUCCESS:
      return { ...state, team: action.team, loading: false, hasError: false };

    case types.GET_TEAM_DETAIL_ERROR:
      return { ...state, team: null, loading: false, hasError: true };

    case types.CLEAR_TEAM_DETAIL:
      return { ...state, team: null, loading: false, hasError: false };

    default:
      return state;
  }
};

export default TeamDetail;
