import * as types from './actionTypes'

export const updateCategoryActivation = (id, isActive) => ({
    type: types.UPDATE_CATEGORY_ACTIVATION,
    id,
    isActive
});

export const updateCategoryActivationSuccess = () => ({
    type: types.UPDATE_CATEGORY_ACTIVATION_SUCCESS
});

export const updateCategoryActivationError = () => ({
    type: types.UPDATE_CATEGORY_ACTIVATION_ERROR
});

export const clearCategoryActivationUpdate = () => ({
    type: types.CLEAR_CATEGORY_ACTIVATION_UPDATE
});
