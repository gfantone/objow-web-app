import * as types from './actionTypes'

export const getPreviousPeriodList = () => {
    return {
        type: types.GET_PREVIOUS_PERIOD_LIST
    }
};

export const getPreviousPeriodListSuccess = (periods) => {
    return {
        type: types.GET_PREVIOUS_PERIOD_LIST_SUCCESS,
        periods
    }
};

export const getPreviousPeriodListError = () => {
    return {
        type: types.GET_PREVIOUS_PERIOD_LIST_ERROR
    }
};