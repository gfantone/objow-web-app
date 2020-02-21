import * as types from './actionTypes'

export const getFreeManagerList = () => {
    return {
        type: types.GET_FREE_MANAGER_LIST
    }
}

export const getManagerListSuccess = (managers) => {
    return {
        type: types.GET_MANAGER_LIST_SUCCESS,
        managers
    }
}

export const getManagerListError = () => {
    return {
        type: types.GET_MANAGER_LIST_ERROR
    }
}