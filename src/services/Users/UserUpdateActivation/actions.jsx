import * as types from './actionTypes'

export const updateUserActivation = (user) => {
    return {
        type: types.UPDATE_USER_ACTIVATION,
        user
    }
};

export const updateUserActivationSuccess = () => {
    return {
        type: types.UPDATE_USER_ACTIVATION_SUCCESS
    }
};

export const updateUserActivationError = () => {
    return {
        type: types.UPDATE_USER_ACTIVATION_ERROR
    }
};

export const clearUserActivationUpdate = () => {
    return {
        type: types.CLEAR_USER_ACTIVATION_UPDATE
    }
};