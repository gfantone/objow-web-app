import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let CategoryActivationUpdate = (state = initialState.categoryActivationUpdate, action) => {
    switch (action.type) {
        case types.UPDATE_CATEGORY_ACTIVATION:
            return {...state, success: false, loading: true, hasError: false};

        case types.UPDATE_CATEGORY_ACTIVATION_SUCCESS:
            return {...state, success: true, loading: false, hasError: false};

        case types.UPDATE_CATEGORY_ACTIVATION_ERROR:
            return {...state, success: false, loading: false, hasError: true};

        case types.CLEAR_CATEGORY_ACTIVATION_UPDATE:
            return {...state, success: false, loading: false, hasError: false};

        default:
            return state;
    }
};

export default CategoryActivationUpdate
