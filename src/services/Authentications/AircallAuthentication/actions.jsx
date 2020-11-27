import * as types from './actionTypes'

export const connectAircall = (code, login, password) => ({
    type: types.CONNECT_AIRCALL,
    code,
    login,
    password
})

export const connectAircallSuccess = (redirectUri) => ({
    type: types.CONNECT_AIRCALL_SUCCESS,
    redirectUri
})

export const connectAircallError = (error) => ({
    type: types.CONNECT_AIRCALL_ERROR,
    error
})

export const clearAircallConnect = () => ({
    type: types.CLEAR_AIRCALL_CONNECT
})
