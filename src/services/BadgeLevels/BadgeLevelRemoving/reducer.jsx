import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let BadgeLevelRemoving = (state = initialState.badgeLevelRemoving, action) => {
    switch (action.type) {
        case types.REMOVE_BADGE_LEVEL:
            return {...state, success: false, loading: true, hasError: false}
            
        case types.REMOVE_BADGE_LEVEL_SUCCESS:
            return {...state, success: true, loading: false, hasError: false}

        case types.REMOVE_BADGE_LEVEL_ERROR:
            return {...state, success: false, loading: false, hasError: true}

        default:
            return state;
    }
}

export default BadgeLevelRemoving