import * as types from './actionTypes'

export const updateAccount = (account) => {
    return {
        type: types.UPDATE_ACCOUNT,
        account
    }
}

export const updateAccountSuccess = () => {
    return {
        type: types.UPDATE_ACCOUNT_SUCCESS
    }
}

export const updateAccountError = () => {
    return {
        type: types.UPDATE_ACCOUNT_ERROR
    }
}