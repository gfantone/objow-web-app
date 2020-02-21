import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let BadgeList = (state = initialState.badgeList, action) => {
    switch (action.type) {
        case types.GET_BADGE_LIST:
            return {...state, badges: null, loading: true, hasError: false}
            
        case types.GET_BADGE_LIST_SUCCESS:
            return {...state, badges: action.badges, loading: false, hasError: false}

        case types.GET_BADGE_LIST_ERROR:
            return {...state, badges: null, loading: false, hasError: true}

        default:
            return state;
    }
}

export default BadgeList