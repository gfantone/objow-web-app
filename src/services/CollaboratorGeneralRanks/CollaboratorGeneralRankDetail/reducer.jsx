import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let CollaboratorGeneralRankDetail = (state = initialState.collaboratorGeneralRankDetail, action) => {
    switch (action.type) {
        case types.GET_COLLABORATOR_GENERAL_RANK_DETAIL:
            return {...state, rank: null, loading: true, hasError: false}
            
        case types.GET_COLLABORATOR_GENERAL_RANK_DETAIL_SUCCESS:
                return {...state, rank: action.rank, loading: false, hasError: false}

        case types.GET_COLLABORATOR_GENERAL_RANK_DETAIL_ERROR:
                return {...state, rank: null, loading: false, hasError: true}

        default:
            return state
    }
}

export default CollaboratorGeneralRankDetail