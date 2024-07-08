import * as types from './actionTypes';

export const getPartner = (id) => ({
  type: types.GET_PARTNER,
  id,
});

export const getPartnerSuccess = (partner) => ({
  type: types.GET_PARTNER_SUCCESS,
  partner,
});

export const getPartnerError = () => ({
  type: types.GET_PARTNER_ERROR,
});
