import * as types from './actionTypes';
import initialState from '../../../store/initialState';

const CollaboratorData = (state = initialState.collaboratorData, action) => {
    switch (action.type) {
        case types.GET_COLLABORATOR_DATA_LIST:
            return {...state, data: null, loading: true, hasError: false}
            
        case types.GET_COLLABORATOR_DATA_LIST_SUCCESS:
            return {...state, data: action.data, loading: false, hasError: false}

        case types.GET_COLLABORATOR_DATA_LIST_ERROR:
            return {...state, data: null, loading: false, hasError: true}

        default:
            return state
    }
}

export default CollaboratorData