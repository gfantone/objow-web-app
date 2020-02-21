import * as types from './actionTypes';

export const getCategoryList = () => {
    return {
        type: types.GET_CATEGORY_LIST,
    }
}

export const getCategoryListSuccess = (categories) => {
    return {
        type: types.GET_CATEGORY_LIST_SUCCESS,
        categories
    }
}

export const getCategoryListError = () => {
    return {
        type: types.GET_CATEGORY_LIST_ERROR
    }
}