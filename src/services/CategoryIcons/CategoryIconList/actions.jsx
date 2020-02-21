import * as types from './actionTypes'

export const getCategoryIconList = () => {
    return {
        type: types.GET_CATEGORY_ICON_LIST
    }
}

export const getCategoryIconListSuccess = (icons) => {
    return {
        type: types.GET_CATEGORY_ICON_LIST_SUCCESS,
        icons
    }
}

export const getCategoryIconListError = () => {
    return {
        type: types.GET_CATEGORY_ICON_LIST_ERROR
    }
}