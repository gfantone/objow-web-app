import * as types from './actionTypes'

export const getFreeCollaboratorList = () => {
    return {
        type: types.GET_FREE_COLLABORATOR_LIST
    }
}

export const getCollaboratorListSuccess = (collaborators) => {
    return {
        type: types.GET_COLLABORATOR_LIST_SUCCESS,
        collaborators
    }
}

export const getCollaboratorListError = () => {
    return {
        type: types.GET_COLLABORATOR_LIST_ERROR
    }
}