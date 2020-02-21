import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let CollaboratorBadgeLevelList = (state = initialState.collaboratorBadgeLevelList, action) => {
    switch (action.type) {
        case types.GET_COLLABORATOR_BADGE_LEVEL_LIST:
            return {...state, levels: null, loading: true, hasError: false}

        case types.GET_COLLABORATOR_NEXT_BADGE_LEVEL_LIST:
            return {...state, levels: null, loading: true, hasError: false}
            
        case types.GET_COLLABORATOR_BADGE_LEVEL_LIST_SUCCESS:
            return {...state, levels: action.levels, loading: false, hasError: false}

        case types.GET_COLLABORATOR_BADGE_LEVEL_LIST_ERROR:
            return {...state, levels: null, loading: false, hasError: true}

        default:
            return state;
    }
}

export default CollaboratorBadgeLevelList