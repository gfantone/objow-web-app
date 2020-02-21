import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let PreviousPeriodList = (state = initialState.previousPeriodList, action) => {
    switch (action.type) {
        case types.GET_PREVIOUS_PERIOD_LIST:
            return {...state, periods: null, loading: true, hasError: false};

        case types.GET_PREVIOUS_PERIOD_LIST_SUCCESS:
            return {...state, periods: action.periods, loading: false, hasError: false};

        case types.GET_PREVIOUS_PERIOD_LIST_ERROR:
            return {...state, periods: null, loading: false, hasError: true};

        default:
            return state
    }
};

export default PreviousPeriodList