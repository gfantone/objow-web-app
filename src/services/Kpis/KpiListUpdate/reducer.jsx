import * as types from './actionTypes';
import initialState from '../../../store/initialState';

const KpiListUpdate = (state = initialState.kpiListUpdate, action) => {
    switch (action.type) {
        case types.UPDATE_KPI_LIST:
            return {...state, success: false, loading: true, hasError: false}

        case types.UPDATE_KPI_LIST_SUCCESS:
            return {...state, success: true, loading: false, hasError: false}

        case types.UPDATE_KPI_LIST_ERROR:
            return {...state, success: false, loading: false, hasError: true}

        case types.CLEAR_KPI_LIST_UPDATE:
            return {...state, success: false, loading: false, hasError: false}

        default:
            return state
    }
}

export default KpiListUpdate
