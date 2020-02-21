import * as types from './actionTypes'

export const getCurrentCollaboratorBadgeDetail = (id) => {
    return {
        type: types.GET_CURRENT_COLLABORATOR_BADGE_DETAIL,
        id
    }
};

export const getCurrentCollaboratorBadgeDetailSuccess = (badge) => {
    return {
        type: types.GET_CURRENT_COLLABORATOR_BADGE_DETAIL_SUCCESS,
        badge
    }
};

export const getCurrentCollaboratorBadgeDetailError = () => {
    return {
        type: types.GET_CURRENT_COLLABORATOR_BADGE_DETAIL_ERROR
    }
};