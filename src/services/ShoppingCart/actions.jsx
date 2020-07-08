import * as types from './actionTypes'

export const addToShoppingCart = (item) => ({
    type: types.ADD_TO_SHOPPING_CART,
    item
})

export const changeShoppingCart = (items) => ({
    type: types.CHANGE_SHOPPING_CART,
    items
})

export const clearShoppingCart = () => ({
    type: types.CLEAR_SHOPPING_CART
})
