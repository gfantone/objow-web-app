import * as types from './actionTypes';

export const getKpiList = () => {
  return {
    type: types.GET_KPI_LIST,
  };
};

export const getKpiListByPartner = (partnerId) => {
  return {
    type: types.GET_KPI_LIST_BY_PARTNER,
    partnerId,
  };
};

export const getKpiListSuccess = (kpis) => {
  return {
    type: types.GET_KPI_LIST_SUCCESS,
    kpis,
  };
};

export const getKpiListError = () => {
  return {
    type: types.GET_KPI_LIST_ERROR,
  };
};
