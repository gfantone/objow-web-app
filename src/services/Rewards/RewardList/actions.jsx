import * as types from './actionTypes'

export const getActiveRewardList = (categoryId) => ({
    type: types.GET_ACTIVE_REWARD_LIST,
    categoryId
})

export const getRewardListSuccess = (rewards) => ({
    type: types.GET_REWARD_LIST_SUCCESS,
    rewards
})

export const getRewardListError = () => ({
    type: types.GET_REWARD_LIST_ERROR
})
