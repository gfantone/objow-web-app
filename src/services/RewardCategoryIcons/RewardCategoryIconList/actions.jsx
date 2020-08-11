import * as types from './actionTypes'

export const getUsableRewardCategoryIconList = () => ({
    type: types.GET_USABLE_REWARD_CATEGORY_ICON_LIST
})

export const getUsableRewardCategoryIconListForRewardCategory = (categoryId) => ({
    type: types.GET_USABLE_REWARD_CATEGORY_ICON_LIST_FOR_REWARD_CATEGORY,
    categoryId
})

export const getRewardCategoryIconListSuccess = (icons) => ({
    type: types.GET_REWARD_CATEGORY_ICON_LIST_SUCCESS,
    icons
})

export const getRewardCategoryIconListError = () => ({
    type: types.GET_REWARD_CATEGORY_ICON_LIST_ERROR
})
