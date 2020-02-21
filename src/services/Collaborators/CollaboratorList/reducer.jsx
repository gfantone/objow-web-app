import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let CollaboratorList = (state = initialState.collaboratorList, action) => {
    switch (action.type) {
        case types.GET_FREE_COLLABORATOR_LIST:
            return {...state, collaborators: null, loading: true, hasError: false}
            
        case types.GET_COLLABORATOR_LIST_SUCCESS:
            return {...state, collaborators: action.collaborators, loading: false, hasError: false}

        case types.GET_COLLABORATOR_LIST_ERROR:
            return {...state, collaborators: null, loading: false, hasError: true}

        default:
            return state;
    }
}

export default CollaboratorList