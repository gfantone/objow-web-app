import * as types from './actionTypes'

export const getCurrentPeriodDetail = () => {
    return {
        type: types.GET_CURRENT_PERIOD_DETAIL
    }
};

export const getCurrentPeriodDetailSuccess = (period) => {
    return {
        type: types.GET_CURRENT_PERIOD_DETAIL_SUCCESS,
        period
    }
};

export const getCurrentPeriodDetailError = () => {
    return {
        type: types.GET_CURRENT_PERIOD_DETAIL_ERROR
    }
};