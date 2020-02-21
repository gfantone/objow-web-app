import * as types from './actionTypes';

export const getCollaboratorDetail = (id, year) => {
    return {
        type: types.GET_COLLABORATOR_DETAIL,
        id,
        year
    }
};

export const getCollaboratorDetailSuccess = (collaborator) => {
    return {
        type: types.GET_COLLABORATOR_DETAIL_SUCCESS,
        collaborator
    }
};

export const getCollaboratorDetailError = () => {
    return {
        type: types.GET_COLLABORATOR_DETAIL_ERROR
    }
};