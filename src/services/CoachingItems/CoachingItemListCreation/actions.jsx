import * as types from './actionTypes'

export const createCoachingItemList = (items) => {
    return {
        type: types.CREATE_COACHING_ITEM_LIST,
        items
    }
}

export const createCoachingItemListSuccess = () => {
    return {
        type: types.CREATE_COACHING_ITEM_LIST_SUCCESS
    }
}

export const createCoachingItemListError = () => {
    return {
        type: types.CREATE_COACHING_ITEM_LIST_ERROR
    }
}