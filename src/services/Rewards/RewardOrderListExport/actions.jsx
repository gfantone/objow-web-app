import * as types from './actionTypes'

export const exportRewardOrderList = (categoryId, teamId, collaboratorId, periodId, validationStart, validationEnd) => ({
    type: types.EXPORT_REWARD_ORDER_LIST,
    categoryId,
    teamId,
    collaboratorId,
    periodId,
    validationStart,
    validationEnd
})

export const exportRewardOrderListSuccess = () => ({
    type: types.EXPORT_REWARD_ORDER_LIST_SUCCESS
})

export const exportRewardOrderListError = () => ({
    type: types.EXPORT_REWARD_ORDER_LIST_ERROR
})
