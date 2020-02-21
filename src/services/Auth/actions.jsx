import * as errors from './errors'
import * as types from './actionTypes';

export const login = (code, login, password) => {
    return {
        type: types.LOGIN,
        code,
        login,
        password
    }
}

export const loginSuccess = (account) => {
    return {
        type: types.LOGIN_SUCCESS,
        account
    }
}

export const loginError = (error) => {
    return {
        type: types.LOGIN_ERROR,
        error
    }
}

export const clearLogin = () => {
    return {
        type: types.CLEAR_LOGIN
    }
}