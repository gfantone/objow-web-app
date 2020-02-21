import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let CurrentPeriodDetail = (state = initialState.currentPeriodDetail, action) => {
    switch (action.type) {
        case types.GET_CURRENT_PERIOD_DETAIL:
            return {...state, period: null, loading: true, hasError: false};

        case types.GET_CURRENT_PERIOD_DETAIL_SUCCESS:
            return {...state, period: action.period, loading: false, hasError: false};

        case types.GET_CURRENT_PERIOD_DETAIL_ERROR:
            return {...state, period: null, loading: false, hasError: true};

        default:
            return state
    }
};

export default CurrentPeriodDetail