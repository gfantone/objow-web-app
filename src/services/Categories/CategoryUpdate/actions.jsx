import * as types from './actionTypes'

export const updateCategory = (category) => ({
    type: types.UPDATE_CATEGORY,
    category
});

export const updateCategorySuccess = () => ({
    type: types.UPDATE_CATEGORY_SUCCESS
});

export const updateCategoryError = () => ({
    type: types.UPDATE_CATEGORY_ERROR,
});
