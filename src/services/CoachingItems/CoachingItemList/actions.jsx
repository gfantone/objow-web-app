import * as types from './actionTypes'

export const getCoachingItemList = (collaboratorId) => {
    return {
        type: types.GET_COACHING_ITEM_LIST,
        collaboratorId
    }
}

export const getCoachingItemListSuccess = (items) => {
    return {
        type: types.GET_COACHING_ITEM_LIST_SUCCESS,
        items
    }
}

export const getCoachingItemListError = () => {
    return {
        type: types.GET_COACHING_ITEM_LIST_ERROR
    }
}
