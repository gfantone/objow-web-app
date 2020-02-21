import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let ConfigUpdate = (state = initialState.configUpdate, action) => {
    switch (action.type) {
        case types.UPDATE_CONFIG:
            return {...state, success: false, loading: true, hasError: false}

        case types.UPDATE_CONFIG_SUCCESS:
            return {...state, success: true, loading: false, hasError: false}

        case types.UPDATE_CONFIG_ERROR:
            return {...state, success: false, loading: false, hasError: true}

        case types.CLEAR_CONFIG_UPDATE:
            return {...state, success: false, loading: false, hasError: false}

        default:
            return state
    }
}

export default ConfigUpdate