import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let CategoryDetail = (state = initialState.categoryDetail, action) => {
    switch (action.type) {
        case types.GET_CATEGORY_DETAIL:
            return {...state, category: null, loading: true, hasError: false}
            
        case types.GET_CATEGORY_DETAIL_SUCCESS:
            return {...state, category: action.category, loading: false, hasError: false}

        case types.GET_CATEGORY_DETAIL_ERROR:
            return {...state, category: null, loading: false, hasError: true}

        default:
            return state;
    }
}

export default CategoryDetail