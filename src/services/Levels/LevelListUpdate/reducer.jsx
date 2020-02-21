import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let LevelListUpdate = (state = initialState.levelListUpdate, action) => {
    switch (action.type) {
        case types.UPDATE_LEVEL_LIST:
            return {...state, success: false, loading: true, hasError: false}
            
        case types.UPDATE_LEVEL_LIST_SUCCESS:
                return {...state, success: true, loading: false, hasError: false}

        case types.UPDATE_LEVEL_LIST_ERROR:
                return {...state, success: false, loading: false, hasError: true}

        case types.CLEAR_LEVEL_LIST_UPDATE:
                return {...state, success: false, loading: false, hasError: false}

        default:
            return state
    }
}

export default LevelListUpdate