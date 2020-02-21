import * as types from './actionTypes'

export const updateCoachingItem = (id, state) => {
    return {
        type: types.UPDATE_COACHING_ITEM,
        id,
        state
    }
}

export const updateCoachingItemSuccess = () => {
    return {
        type: types.UPDATE_COACHING_ITEM_SUCCESS
    }
}

export const updateCoachingItemError = (id, state) => {
    return {
        type: types.UPDATE_COACHING_ITEM_ERROR
    }
}