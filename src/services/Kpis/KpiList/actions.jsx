import * as types from './actionTypes'

export const getKpiList = () => {
    return {
        type: types.GET_KPI_LIST
    }
}

export const getKpiListSuccess = (kpis) => {
    return {
        type: types.GET_KPI_LIST_SUCCESS,
        kpis
    }
}

export const getKpiListError = () => {
    return {
        type: types.GET_KPI_LIST_ERROR
    }
}