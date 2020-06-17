import * as types from './actionTypes'

export const getCollaboratorRewardOrder = (id) => ({
    type: types.GET_COLLABORATOR_REWARD_ORDER,
    id
})

export const getCollaboratorRewardOrderSuccess = (order) => ({
    type: types.GET_COLLABORATOR_REWARD_ORDER_SUCCESS,
    order
})

export const getCollaboratorRewardOrderError = () => ({
    type: types.GET_COLLABORATOR_REWARD_ORDER_ERROR
})
