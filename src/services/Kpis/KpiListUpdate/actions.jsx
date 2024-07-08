import * as types from './actionTypes';

export const updateKpiList = (kpis) => ({
  type: types.UPDATE_KPI_LIST,
  kpis,
});

export const updateKpiListSuccess = () => ({
  type: types.UPDATE_KPI_LIST_SUCCESS,
});

export const updateKpiListError = () => ({
  type: types.UPDATE_KPI_LIST_ERROR,
});

export const clearKpiListUpdate = () => ({
  type: types.CLEAR_KPI_LIST_UPDATE,
});
