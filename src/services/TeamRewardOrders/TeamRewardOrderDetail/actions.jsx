import * as types from './actionTypes'

export const getTeamRewardOrder = (id) => ({
    type: types.GET_TEAM_REWARD_ORDER,
    id
})

export const getTeamRewardOrderSuccess = (order) => ({
    type: types.GET_TEAM_REWARD_ORDER_SUCCESS,
    order
})

export const getTeamRewardOrderError = () => ({
    type: types.GET_TEAM_REWARD_ORDER_ERROR
})

export const clearTeamRewardOrderDetail = () => ({
    type: types.CLEAR_TEAM_REWARD_ORDER_DETAIL
})
