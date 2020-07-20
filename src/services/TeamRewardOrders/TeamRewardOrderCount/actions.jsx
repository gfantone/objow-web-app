import * as types from './actionTypes'

export const countWaitingTeamRewardOrders = () => ({
    type: types.COUNT_WAITING_TEAM_REWARD_ORDER
})

export const countTeamRewardOrderSuccess = (orders) => ({
    type: types.COUNT_TEAM_REWARD_ORDER_SUCCESS,
    orders
})

export const countTeamRewardOrderError = () => ({
    type: types.COUNT_TEAM_REWARD_ORDER_ERROR
})
