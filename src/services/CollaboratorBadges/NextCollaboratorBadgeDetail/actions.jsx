import * as types from './actionTypes'

export const getNextCollaboratorBadgeDetail = (id) => {
    return {
        type: types.GET_NEXT_COLLABORATOR_BADGE_DETAIL,
        id
    }
};

export const getNextCollaboratorBadgeDetailSuccess = (badge) => {
    return {
        type: types.GET_NEXT_COLLABORATOR_BADGE_DETAIL_SUCCESS,
        badge
    }
};

export const getNextCollaboratorBadgeDetailError = () => {
    return {
        type: types.GET_NEXT_COLLABORATOR_BADGE_DETAIL_ERROR
    }
};