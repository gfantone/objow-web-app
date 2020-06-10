import * as types from './actionTypes'

export const updateReward = (reward) => ({
    type: types.UPDATE_REWARD,
    reward
})

export const updateRewardSuccess = () => ({
    type: types.UPDATE_REWARD_SUCCESS,
})

export const updateRewardError = () => ({
    type: types.UPDATE_REWARD_ERROR
})

export const clearRewardUpdate = () => ({
    type: types.CLEAR_REWARD_UPDATE
})
