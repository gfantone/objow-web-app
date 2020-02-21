import * as types from './actionTypes';
import initialState from '../../../store/initialState';

const KpiList = (state = initialState.kpiList, action) => {
    switch (action.type) {
        case types.GET_KPI_LIST:
            return {...state, kpis: null, loading: true, hasError: false}
            
        case types.GET_KPI_LIST_SUCCESS:
            return {...state, kpis: action.kpis, loading: false, hasError: false}

        case types.GET_KPI_LIST_ERROR:
            return {...state, kpis: null, loading: false, hasError: true}

        default:
            return state
    }
}

export default KpiList