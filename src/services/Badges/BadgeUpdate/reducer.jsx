import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let BadgeUpdate = (state = initialState.badgeUpdate, action) => {
    switch (action.type) {
        case types.UPDATE_BADGE:
            return {...state, success: false, loading: true, hasError: false};

        case types.UPDATE_BADGE_SUCCESS:
            return {...state, success: true, loading: false, hasError: false};

        case types.UPDATE_BADGE_ERROR:
            return {...state, success: false, loading: false, hasError: true};

        case types.CLEAR_BADGE_UPDATE:
            return {...state, success: false, loading: false, hasError: false};

        default:
            return state;
    }
};

export default BadgeUpdate