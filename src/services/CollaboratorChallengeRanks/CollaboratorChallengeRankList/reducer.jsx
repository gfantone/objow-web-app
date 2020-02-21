import * as types from './actionTypes';
import initialState from '../../../store/initialState';

const CollaboratorChallengeRankList = (state = initialState.collaboratorChallengeRankList, action) => {
    switch (action.type) {
        case types.GET_COLLABORATOR_CHALLENGE_RANK_LIST_BY_COLLABORATOR_CHALLENGE:
        case types.GET_COLLABORATOR_CHALLENGE_RANK_LIST_BY_TEAM_COLLABORATOR_CHALLENGE:
            return {...state, ranks: null, loading: true, hasError: false}
            
        case types.GET_COLLABORATOR_CHALLENGE_RANK_LIST_SUCCESS:
                return {...state, ranks: action.ranks, loading: false, hasError: false}

        case types.GET_COLLABORATOR_CHALLENGE_RANK_LIST_ERROR:
                return {...state, ranks: null, loading: false, hasError: true}

        default:
            return state
    }
}

export default CollaboratorChallengeRankList