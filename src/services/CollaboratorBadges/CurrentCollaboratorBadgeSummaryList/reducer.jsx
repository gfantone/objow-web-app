import * as types from './actionTypes';
import initialState from '../../../store/initialState';

const CurrentCollaboratorBadgeSummaryList = (state = initialState.CurrentCollaboratorBadgeSummaryList, action) => {
    switch (action.type) {
        case types.GET_CURRENT_COLLABORATOR_BADGE_SUMMARY_LIST:
            return {...state, badges: null, loading: true, hasError: false};

        case types.GET_CURRENT_COLLABORATOR_BADGE_SUMMARY_LIST_SUCCESS:
            return {...state, badges: action.badges, loading: false, hasError: false};

        case types.GET_CURRENT_COLLABORATOR_BADGE_SUMMARY_LIST_ERROR:
            return {...state, badges: null, loading: false, hasError: false};

        default:
            return state;
    }
};

export default CurrentCollaboratorBadgeSummaryList