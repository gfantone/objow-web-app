import * as types from './actionTypes'

export const getRoleList = () => {
    return {
        type: types.GET_ROLE_LIST
    }
}

export const getRoleListSuccess = (roles) => {
    return {
        type: types.GET_ROLE_LIST_SUCCESS,
        roles
    }
}

export const getRoleListError = () => {
    return {
        type: types.GET_ROLE_LIST_ERROR
    }
}