import * as types from './actionTypes';
import initialState from '../../../store/initialState'

const LevelListRemoving = (state = initialState.levelListRemoving, action) => {
    switch (action.type) {
        case types.REMOVE_LEVEL_LIST:
            return { ...state, success: false, loading: true, hasError: false }

        case types.REMOVE_LEVEL_LIST_SUCCESS:
            return { ...state, success: true, loading: false, hasError: false }

        case types.REMOVE_LEVEL_LIST_ERROR:
            return { ...state, success: false, loading: false, hasError: true }

        default:
            return state
    }
}

export default LevelListRemoving