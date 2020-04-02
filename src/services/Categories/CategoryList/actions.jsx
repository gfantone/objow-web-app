import * as types from './actionTypes';

export const getActiveCategoryList = () => {
    return {
        type: types.GET_ACTIVE_CATEGORY_LIST,
    }
};

export const getInactiveCategoryList = () => {
    return {
        type: types.GET_INACTIVE_CATEGORY_LIST,
    }
};

export const getCategoryListSuccess = (categories) => {
    return {
        type: types.GET_CATEGORY_LIST_SUCCESS,
        categories
    }
};

export const getCategoryListError = () => {
    return {
        type: types.GET_CATEGORY_LIST_ERROR
    }
};
