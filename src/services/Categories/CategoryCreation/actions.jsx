import * as types from './actionTypes';

export const createCategory = (category) => {
    return {
        type: types.CREATE_CATEGORY,
        category
    }
}

export const createCategorySuccess = (category) => {
    return {
        type: types.CREATE_CATEGORY_SUCCESS,
        category
    }
}

export const createCategoryError = () => {
    return {
        type: types.CREATE_CATEGORY_ERROR
    }
}

export const clearCategoryCreation = () => {
    return {
        type: types.CLEAR_CATEGORY_CREATION
    }
}