import * as types from './actionTypes'

export const getTeamCategoryRankListByCategory = (categoryId, periodId) => {
    return {
        type: types.GET_TEAM_CATEGORY_RANK_LIST_BY_CATEGORY,
        categoryId,
        periodId
    }
};

export const getTeamCategoryRankListByTeam = (teamId, year) => {
    return {
        type: types.GET_TEAM_CATEGORY_RANK_LIST_BY_TEAM,
        teamId,
        year
    }
};

export const getTeamCategoryRankListSuccess = (ranks) => {
    return {
        type: types.GET_TEAM_CATEGORY_RANK_LIST_SUCCESS,
        ranks
    }
};

export const getTeamCategoryRankListError = () => {
    return {
        type: types.GET_TEAM_CATEGORY_RANK_LIST_ERROR
    }
};