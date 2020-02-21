import * as types from './actionTypes';
import initialState from '../../../store/initialState';

const SystemImageUpdate = (state = initialState.systemImageUpdate, action) => {
    switch (action.type) {
        case types.UPDATE_SYSTEM_IMAGE:
            return { ...state, success: false, loading: true, hasError: false }
            
        case types.UPDATE_SYSTEM_IMAGE_SUCCESS:
                return { ...state, success: true, loading: false, hasError: false }

        case types.UPDATE_SYSTEM_IMAGE_ERROR:
                return { ...state, success: false, loading: false, hasError: true }

        case types.CLEAR_SYSTEM_IMAGE_UPDATE:
                return { ...state, success: false, loading: false, hasError: false }

        default:
            return state
    }
}

export default SystemImageUpdate