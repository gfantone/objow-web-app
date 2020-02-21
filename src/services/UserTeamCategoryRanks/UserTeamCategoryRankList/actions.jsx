import * as types from './actionTypes';

export const getUserTeamCategoryRankList = () => {
    return {
        type: types.GET_TEAM_CATEGORY_RANK_LIST
    }
}

export const getUserTeamCategoryRankListSuccess = (ranks) => {
    return {
        type: types.GET_TEAM_CATEGORY_RANK_LIST_SUCCESS,
        ranks
    }
}

export const getUserTeamCategoryRankListError = () => {
    return {
        type: types.GET_TEAM_CATEGORY_RANK_LIST_ERROR
    }
}