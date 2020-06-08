import * as types from './actionTypes'

export const getRewardCategoryIconList = () => ({
    type: types.GET_REWARD_CATEGORY_ICON_LIST
})

export const getRewardCategoryIconListSuccess = (icons) => ({
    type: types.GET_REWARD_CATEGORY_ICON_LIST_SUCCESS,
    icons
})

export const getRewardCategoryIconListError = () => ({
    type: types.GET_REWARD_CATEGORY_ICON_LIST_ERROR
})
