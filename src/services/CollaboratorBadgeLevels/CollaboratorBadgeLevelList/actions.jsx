import * as types from './actionTypes'

export const getCollaboratorBadgeLevelList = (collaboratorId, year) => {
    return {
        type: types.GET_COLLABORATOR_BADGE_LEVEL_LIST,
        collaboratorId,
        year
    }
};

export const getCollaboratorNextBadgeLevelList = (collaboratorId, year) => {
    return {
        type: types.GET_COLLABORATOR_NEXT_BADGE_LEVEL_LIST,
        collaboratorId,
        year
    }
};

export const getCollaboratorBadgeLevelListSuccess = (levels) => {
    return {
        type: types.GET_COLLABORATOR_BADGE_LEVEL_LIST_SUCCESS,
        levels
    }
};

export const getCollaboratorBadgeLevelListError = () => {
    return {
        type: types.GET_COLLABORATOR_BADGE_LEVEL_LIST_ERROR
    }
};