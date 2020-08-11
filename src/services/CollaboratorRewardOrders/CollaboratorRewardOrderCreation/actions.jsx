import * as types from './actionTypes'

export const createCollaboratorRewardOrder = (order, items) => ({
    type: types.CREATE_COLLABORATOR_REWARD_ORDER,
    order,
    items
})

export const createCollaboratorRewardOrderSuccess = () => ({
    type: types.CREATE_COLLABORATOR_REWARD_ORDER_SUCCESS
})

export const createCollaboratorRewardOrderError = () => ({
    type: types.CREATE_COLLABORATOR_REWARD_ORDER_ERROR
})

export const clearCollaboratorRewardOrderCreation = () => ({
    type: types.CLEAR_COLLABORATOR_REWARD_ORDER_CREATION
})
