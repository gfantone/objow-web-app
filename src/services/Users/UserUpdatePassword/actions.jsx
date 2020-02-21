import * as types from './actionTypes'

export const updateUserPassword = (id, password) => {
    return {
        type: types.UPDATE_USER_PASSWORD,
        id,
        password
    }
};

export const updateUserPasswordSuccess = () => {
    return {
        type: types.UPDATE_USER_PASSWORD_SUCCESS
    }
};

export const updateUserPasswordError = () => {
    return {
        type: types.UPDATE_USER_PASSWORD_ERROR
    }
};