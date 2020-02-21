import * as types from './actionTypes'

export const updateUser = (user) => {
    return {
        type: types.UPDATE_USER,
        user
    }
}

export const updateUserSuccess = () => {
    return {
        type: types.UPDATE_USER_SUCCESS
    }
}

export const updateUserError = () => {
    return {
        type: types.UPDATE_USER_ERROR
    }
}

export const clearUserUpdate = () => {
    return {
        type: types.CLEAR_USER_UPDATE
    }
}