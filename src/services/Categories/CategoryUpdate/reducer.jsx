import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let CategoryUpdate = (state = initialState.categoryUpdate, action) => {
    switch (action.type) {
        case types.UPDATE_CATEGORY:
            return {...state, success: false, loading: true, hasError: false};

        case types.UPDATE_CATEGORY_SUCCESS:
            return {...state, success: true, loading: false, hasError: false};

        case types.UPDATE_CATEGORY_ERROR:
            return {...state, success: false, loading: false, hasError: true};

        default:
            return state;
    }
};

export default CategoryUpdate
