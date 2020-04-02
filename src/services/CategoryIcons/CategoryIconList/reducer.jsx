import * as types from './actionTypes';
import initialState from '../../../store/initialState';

const CategoryIconList = (state = initialState.categoryIconList, action) => {
    switch (action.type) {
        case types.GET_USABLE_LIST:
        case types.GET_USABLE_LIST_FOR_CATEGORY:
            return {...state, icons: null, loading: true, hasError: false};

        case types.GET_CATEGORY_ICON_LIST_SUCCESS:
            return {...state, icons: action.icons, loading: false, hasError: false};

        case types.GET_CATEGORY_ICON_LIST_ERROR:
            return {...state, icons: null, loading: false, hasError: true};

        default:
            return state;
    }
};

export default CategoryIconList
