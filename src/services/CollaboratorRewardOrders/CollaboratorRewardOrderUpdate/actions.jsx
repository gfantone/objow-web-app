import * as types from './actionTypes'

export const updateCollaboratorRewardOrderValidation = (id, isValid) => ({
    type: types.UPDATE_COLLABORATOR_REWARD_ORDER_VALIDATION,
    id,
    isValid
})

export const updateCollaboratorRewardOrderSuccess = () => ({
    type: types.UPDATE_COLLABORATOR_REWARD_ORDER_SUCCESS
})

export const updateCollaboratorRewardOrderError = () => ({
    type: types.UPDATE_COLLABORATOR_REWARD_ORDER_ERROR
})

export const clearCollaboratorRewardOrderUpdate = () => ({
    type: types.CLEAR_COLLABORATOR_REWARD_ORDER_UPDATE
})
