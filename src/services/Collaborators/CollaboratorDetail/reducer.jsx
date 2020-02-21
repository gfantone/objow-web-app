import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let CollaboratorDetail = (state = initialState.collaboratorDetail, action) => {
    switch (action.type) {
        case types.GET_COLLABORATOR_DETAIL:
            return {...state, collaborator: null, loading: true, hasError: false}
            
        case types.GET_COLLABORATOR_DETAIL_SUCCESS:
            return {...state, collaborator: action.collaborator, loading: false, hasError: false}

        case types.GET_COLLABORATOR_DETAIL_ERROR:
            return {...state, collaborator: null, loading: false, hasError: true}

        default:
            return state;
    }
}

export default CollaboratorDetail