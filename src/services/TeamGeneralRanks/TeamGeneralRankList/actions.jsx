import * as types from './actionTypes'

export const getTeamGeneralRankList = (periodId) => {
    return {
        type: types.GET_TEAM_GENERAL_RANK_LIST,
        periodId
    }
};

export const getTeamGeneralRankListSuccess = (ranking) => {
    return {
        type: types.GET_TEAM_GENERAL_RANK_LIST_SUCCESS,
        ranking
    }
};

export const getTeamGeneralRankListError = () => {
    return {
        type: types.GET_TEAM_GENERAL_RANK_LIST_ERROR
    }
};