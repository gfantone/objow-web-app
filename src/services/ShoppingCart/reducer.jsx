import * as types from './actionTypes';
import initialState from '../../store/initialState';

let RoleList = (state = initialState.shoppingCart, action) => {
    switch (action.type) {
        case types.ADD_TO_SHOPPING_CART:
            const items = state.items
            items.push(action.item)
            return {...state, items: items, lastItem: action.item}

        case types.CHANGE_SHOPPING_CART:
            return {...state, items: action.items}

        case types.CLEAR_LAST_ITEM:
            return {...state, lastItem: null}

        case types.CLEAR_SHOPPING_CART:
            return {...state, items: [], lastItem: null}

        default:
            return state
    }
}

export default RoleList
