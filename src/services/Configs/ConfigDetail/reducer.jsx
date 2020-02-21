import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let ConfigDetail = (state = initialState.configDetail, action) => {
    switch (action.type) {
        case types.GET_CONFIG_DETAIL:
            return {...state, config: null, loading: true, hasError: false}

        case types.GET_CONFIG_DETAIL_SUCCESS:
            return {...state, config: action.config, loading: false, hasError: false}

        case types.GET_CONFIG_DETAIL_ERROR:
            return {...state, config: null, loading: false, hasError: true}

        default:
            return state
    }
}

export default ConfigDetail