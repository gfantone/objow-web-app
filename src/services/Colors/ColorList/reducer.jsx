import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let ColorList = (state = initialState.colorList, action) => {
    switch (action.type) {
        case types.GET_FREE_COLOR_LIST:
            return {...state, colors: null, loading: true, hasError: false}

        case types.GET_COLOR_LIST_SUCCESS:
            return {...state, colors: action.colors, loading: false, hasError: false}

        case types.GET_COLOR_LIST_ERROR:
            return {...state, colors: null, loading: false, hasError: true}

        default:
            return state
    }
}

export default ColorList