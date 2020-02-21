import * as types from './actionTypes'

export const getCollaboratorDataList = (kpiId) => {
    return {
        type: types.GET_COLLABORATOR_DATA_LIST,
        kpiId
    }
}

export const getCollaboratorDataListSuccess = (data) => {
    return {
        type: types.GET_COLLABORATOR_DATA_LIST_SUCCESS,
        data
    }
}

export const getCollaboratorDataListError = () => {
    return {
        type: types.GET_COLLABORATOR_DATA_LIST_ERROR
    }
}