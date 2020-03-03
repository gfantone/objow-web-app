import * as errors from './errors'
import * as types from './actionTypes';

export const login = (code, login, password) => {
    return {
        type: types.LOGIN,
        code,
        login,
        password
    }
};

export const loginSuccess = () => {
    return {
        type: types.LOGIN_SUCCESS
    }
};

export const loginError = (error) => {
    return {
        type: types.LOGIN_ERROR,
        error
    }
};

export const clearLogin = () => {
    return {
        type: types.CLEAR_LOGIN
    }
};
