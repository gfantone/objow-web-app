import * as types from './actionTypes';
import initialState from '../../../store/initialState';

const KpiDetail = (state = initialState.kpiDetail, action) => {
    switch (action.type) {
        case types.GET_KPI_DETAIL:
            return {...state, kpi: null, loading: true, hasError: false}
            
        case types.GET_KPI_DETAIL_SUCCESS:
            return {...state, kpi: action.kpi, loading: false, hasError: false}

        case types.GET_KPI_DETAIL_ERROR:
            return {...state, kpi: null, loading: false, hasError: true}

        default:
            return state
    }
}

export default KpiDetail