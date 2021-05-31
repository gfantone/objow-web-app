import * as types from './actionTypes'

export const getUnitList = () => {
    return {
        type: types.GET_UNIT_LIST
    }
}

export const getUnitListSuccess = (units) => {
    return {
        type: types.GET_UNIT_LIST_SUCCESS,
        units
    }
}

export const getUnitListError = () => {
    return {
        type: types.GET_UNIT_LIST_ERROR
    }
}
