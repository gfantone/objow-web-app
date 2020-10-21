import * as types from './actionTypes'

export const getPartnerList = () => ({
    type: types.GET_PARTNER_LIST
})

export const getPartnerListSuccess = (partners) => ({
    type: types.GET_PARTNER_LIST_SUCCESS,
    partners
})

export const getPartnerListError = () => ({
    type: types.GET_PARTNER_LIST_ERROR
})
