import * as types from './actionTypes'

export const connectAircall = (code, login, password, oauthCode) => ({
    type: types.CONNECT_AIRCALL,
    code,
    login,
    password,
    oauthCode
})

export const connectAircallSuccess = () => ({
    type: types.CONNECT_AIRCALL_SUCCESS
})

export const connectAircallError = (error) => ({
    type: types.CONNECT_AIRCALL_ERROR,
    error
})

export const clearAircallConnect = () => ({
    type: types.CLEAR_AIRCALL_CONNECT
})
