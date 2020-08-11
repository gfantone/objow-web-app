import * as types from './actionTypes'

export const addItem = (item) => ({
    type: types.ADD_TO_SHOPPING_CART,
    item
})

export const changeItem = (reward, quantity) => ({
    type: types.CHANGE_SHOPPING_CART,
    reward,
    quantity
})

export const clearLastItem = () => ({
    type: types.CLEAR_LAST_ITEM
})

export const clearShoppingCart = () => ({
    type: types.CLEAR_SHOPPING_CART
})
