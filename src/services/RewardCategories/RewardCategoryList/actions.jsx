import * as types from './actionTypes'

export const getActiveRewardCategoryList = () => ({
    type: types.GET_ACTIVE_REWARD_CATEGORY_LIST
})

export const getInactiveRewardCategoryList = () => ({
    type: types.GET_INACTIVE_REWARD_CATEGORY_LIST
})

export const getRewardCategoryListSuccess = (categories) => ({
    type: types.GET_REWARD_CATEGORY_LIST_SUCCESS,
    categories
})

export const getRewardCategoryListError = () => ({
    type: types.GET_REWARD_CATEGORY_LIST_ERROR
})
