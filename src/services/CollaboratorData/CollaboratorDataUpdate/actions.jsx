import * as types from './actionTypes'

export const updateCollaboratorData = (data) => {
    return {
        type: types.UPDATE_COLLABORATOR_DATA,
        data
    }
}

export const updateCollaboratorDataSuccess = () => {
    return {
        type: types.UPDATE_COLLABORATOR_DATA_SUCCESS
    }
}

export const updateCollaboratorDataError = () => {
    return {
        type: types.UPDATE_COLLABORATOR_DATA_ERROR
    }
}

export const clearCollaboratorDataUpdate = () => {
    return {
        type: types.CLEAR_COLLABORATOR_DATA_UPDATE
    }
}