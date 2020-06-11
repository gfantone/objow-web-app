import * as types from './actionTypes'

export const countWaitingCollaboratorRewardOrders = () => ({
    type: types.COUNT_WAITING_COLLABORATOR_REWARD_ORDER
})

export const countCollaboratorRewardOrderSuccess = (orders) => ({
    type: types.COUNT_COLLABORATOR_REWARD_ORDER_SUCCESS,
    orders
})

export const countCollaboratorRewardOrderError = () => ({
    type: types.COUNT_COLLABORATOR_REWARD_ORDER_ERROR
})
