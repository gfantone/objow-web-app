import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let PeriodicityList = (state = initialState.periodicityList, action) => {
    switch (action.type) {
        case types.GET_PERIODICITY_LIST:
            return {...state, periodicities: [], loading: true, hasError: false}
            
        case types.GET_PERIODICITY_LIST_SUCCESS:
                return {...state, periodicities: action.periodicities, loading: false, hasError: false}

        case types.GET_PERIODICITY_LIST_ERROR:
                return {...state, periodicities: [], loading: false, hasError: true}

        default:
            return state
    }
}

export default PeriodicityList