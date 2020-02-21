import * as types from './actionTypes';

export const getUserPlayerCategoryRankList = () => {
    return {
        type: types.GET_USER_PLAYER_CATEGORY_RANK_LIST
    }
}

export const getUserPlayerCategoryRankListSuccess = (ranks) => {
    return {
        type: types.GET_USER_PLAYER_CATEGORY_RANK_LIST_SUCCESS,
        ranks
    }
}

export const getUserPlayerCategoryRankListError = () => {
    return {
        type: types.GET_USER_PLAYER_CATEGORY_RANK_LIST_ERROR
    }
}