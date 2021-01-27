import * as types from './actionTypes'

export const getLevelDetail = (id) => {
    return {
        type: types.GET_LEVEL_DETAIL,
        id
    }
}

export const getLevelDetailSuccess = (category) => {
    return {
        type: types.GET_LEVEL_DETAIL_SUCCESS,
        category
    }
}

export const getLevelDetailError = () => {
    return {
        type: types.GET_LEVEL_DETAIL_ERROR
    }
}
