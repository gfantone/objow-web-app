import * as types from './actionTypes'

export const getActiveRewardList = () => ({
    type: types.GET_ACTIVE_REWARD_LIST
})

export const getRewardListSuccess = (rewards) => ({
    type: types.GET_REWARD_LIST_SUCCESS,
    rewards
})

export const getRewardListError = () => ({
    type: types.GET_REWARD_LIST_ERROR
})
