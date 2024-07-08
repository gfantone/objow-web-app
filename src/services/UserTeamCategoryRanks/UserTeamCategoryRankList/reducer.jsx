import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let UserTeamCategoryRankList = (
  state = initialState.userTeamCategoryRankList,
  action,
) => {
  switch (action.type) {
    case types.GET_TEAM_CATEGORY_RANK_LIST:
      return { ...state, ranks: [], loading: true, hasError: false };

    case types.GET_TEAM_CATEGORY_RANK_LIST_SUCCESS:
      return { ...state, ranks: action.ranks, loading: false, hasError: false };

    case types.GET_TEAM_CATEGORY_RANK_LIST_ERROR:
      return { ...state, ranks: [], loading: false, hasError: true };

    default:
      return state;
  }
};

export default UserTeamCategoryRankList;
