import * as types from './actionTypes';
import initialState from '../../../store/initialState';

const ConfigList = (state = initialState.configList, action) => {
    switch (action.type) {
        case types.GET_CONFIG_LIST:
        case types.GET_PERMANENT_CONFIG_LIST:
            return {...state, configs: null, loading: true, hasError: false};

        case types.GET_CONFIG_LIST_SUCCESS:
            return {...state, configs: action.configs, loading: false, hasError: false};

        case types.GET_CONFIG_LIST_ERROR:
            return {...state, configs: null, loading: false, hasError: true};

        case types.CLEAR_CONFIG_LIST:
            return {...state, configs: null, loading: false, hasError: false};

        default:
            return state
    }
};

export default ConfigList