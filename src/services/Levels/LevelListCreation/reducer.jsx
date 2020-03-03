import * as types from './actionTypes';
import initialState from '../../../store/initialState';

const LevelListCreation = (state = initialState.levelListCreation, action) => {
    switch (action.type) {
        case types.CREATE_LEVEL_LIST:
            return {...state, success: false, loading: true, hasError: false};

        case types.CREATE_LEVEL_LIST_SUCCESS:
                return {...state, success: true, loading: false, hasError: false};

        case types.CREATE_LEVEL_LIST_ERROR:
                return {...state, success: false, loading: false, hasError: true};

        case types.CLEAR_LEVEL_LIST_CREATION:
                return {...state, success: false, loading: false, hasError: false};

        default:
            return state
    }
};

export default LevelListCreation
