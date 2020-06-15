import * as types from './actionTypes'

export const getValidatedCollaboratorRewardOrderSummaryList = () => ({
    type: types.GET_VALIDATED_COLLABORATOR_REWARD_ORDER_SUMMARY_LIST
})

export const getWaitingCollaboratorRewardOrderSummaryList = () => ({
    type: types.GET_WAITING_COLLABORATOR_REWARD_ORDER_SUMMARY_LIST
})

export const getCollaboratorRewardOrderSummaryListSuccess = () => ({
    type: types.GET_COLLABORATOR_REWARD_ORDER_SUMMARY_LIST_SUCCESS
})

export const getCollaboratorRewardOrderSummaryListError = () => ({
    type: types.GET_COLLABORATOR_REWARD_ORDER_SUMMARY_LIST_ERROR
})
