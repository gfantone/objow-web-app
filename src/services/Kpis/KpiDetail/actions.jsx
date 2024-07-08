import * as types from './actionTypes';

export const getKpiDetail = (id) => {
  return {
    type: types.GET_KPI_DETAIL,
    id,
  };
};

export const getKpiDetailSuccess = (kpi) => {
  return {
    type: types.GET_KPI_DETAIL_SUCCESS,
    kpi,
  };
};

export const getKpiDetailError = () => {
  return {
    type: types.GET_KPI_DETAIL_ERROR,
  };
};

export const getKpiDetailClear = () => {
  return {
    type: types.GET_KPI_DETAIL_CLEAR,
  };
};
