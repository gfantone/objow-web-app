import * as actionTypes from './actionTypes'

export const getRewardTypeList = () => ({
    type: actionTypes.GET_REWARD_TYPE_LIST
})

export const getRewardTypeListSuccess = (types) => ({
    type: actionTypes.GET_REWARD_TYPE_LIST_SUCCESS,
    types
})

export const getRewardTypeListError = () => ({
    type: actionTypes.GET_REWARD_TYPE_LIST_ERROR
})
