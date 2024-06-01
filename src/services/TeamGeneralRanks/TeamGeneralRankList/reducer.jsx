import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let TeamGeneralRankList = (
  state = initialState.teamGeneralRankList,
  action,
) => {
  switch (action.type) {
    case types.GET_TEAM_GENERAL_RANK_LIST:
      return { ...state, ranking: [], loading: true, hasError: false };

    case types.GET_TEAM_GENERAL_RANK_LIST_SUCCESS:
      return {
        ...state,
        ranking: action.ranking,
        loading: false,
        hasError: false,
      };

    case types.GET_TEAM_GENERAL_RANK_LIST_ERROR:
      return { ...state, ranking: [], loading: false, hasError: true };

    default:
      return state;
  }
};

export default TeamGeneralRankList;
