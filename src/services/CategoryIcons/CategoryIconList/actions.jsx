import * as types from './actionTypes'

export const getUsableList = () => ({
    type: types.GET_USABLE_LIST
});

export const getUsableListForCategory = (categoryId) => ({
    type: types.GET_USABLE_LIST_FOR_CATEGORY,
    categoryId
});

export const getCategoryIconListSuccess = (icons) => ({
    type: types.GET_CATEGORY_ICON_LIST_SUCCESS,
    icons
});

export const getCategoryIconListError = () => ({
    type: types.GET_CATEGORY_ICON_LIST_ERROR
});
