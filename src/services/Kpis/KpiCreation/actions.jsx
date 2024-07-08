import * as types from './actionTypes';

export const createKpi = (kpi) => {
  return {
    type: types.CREATE_KPI,
    kpi,
  };
};

export const createKpiSuccess = () => {
  return {
    type: types.CREATE_KPI_SUCCESS,
  };
};

export const createKpiError = () => {
  return {
    type: types.CREATE_KPI_ERROR,
  };
};
