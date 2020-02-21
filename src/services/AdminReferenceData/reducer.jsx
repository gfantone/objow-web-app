import * as types from './actionTypes';
import initialState from '../../store/initialState';

let AdminReferenceData = (state = initialState.adminReferenceData, action) => {
    switch (action.type) {
        case types.GET_ADMIN_REFERENCE_DATA:
            return {...state, categories: [], categoryIcons: [], goalTypes: [], kpis: [], periodicities: [], loading: true, hasError: false}
            
        case types.GET_ADMIN_REFERENCE_DATA_SUCCESS:
                return {...state, categories: action.categories, categoryIcons: action.categoryIcons, goalTypes: action.goalTypes, kpis: action.kpis, periodicities: action.periodicities, loading: false, hasError: false}

        case types.GET_ADMIN_REFERENCE_DATA_ERROR:
                return {...state, categories: [], categoryIcons: [], goalTypes: [], kpis: [], periodicities: [], loading: false, hasError: true}

        default:
            return state;
    }
}

export default AdminReferenceData;