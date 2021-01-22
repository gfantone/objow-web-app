import * as types from './actionTypes'

export const getUsableList = () => ({
    type: types.GET_USABLE_LIST
});

export const getUsableListForLevel = (categoryId) => ({
    type: types.GET_USABLE_LIST_FOR_LEVEL,
    categoryId
});

export const getLevelIconListSuccess = (icons) => ({
    type: types.GET_LEVEL_ICON_LIST_SUCCESS,
    icons
});

export const getLevelIconListError = () => ({
    type: types.GET_LEVEL_ICON_LIST_ERROR
});
