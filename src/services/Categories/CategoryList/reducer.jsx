import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let CategoryList = (state = initialState.categoryList, action) => {
    switch (action.type) {
        case types.GET_CATEGORY_LIST:
            return {...state, categories: [], loading: true, hasError: false}
            
        case types.GET_CATEGORY_LIST_SUCCESS:
            return {...state, categories: action.categories, loading: false, hasError: false}

        case types.GET_CATEGORY_LIST_ERROR:
            return {...state, categories: [], loading: false, hasError: true}

        default:
            return state;
    }
}

export default CategoryList