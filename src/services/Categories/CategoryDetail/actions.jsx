import * as types from './actionTypes'

export const getCategoryDetail = (id) => {
    return {
        type: types.GET_CATEGORY_DETAIL,
        id
    }
}

export const getCategoryDetailSuccess = (category) => {
    return {
        type: types.GET_CATEGORY_DETAIL_SUCCESS,
        category
    }
}

export const getCategoryDetailError = () => {
    return {
        type: types.GET_CATEGORY_DETAIL_ERROR
    }
}