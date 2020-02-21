import * as types from './actionTypes';
import initialState from '../../../store/initialState';

const CollaboratorGoalRankList = (state = initialState.collaboratorGoalRankList, action) => {
    switch (action.type) {
        case types.GET_COLLABORATOR_GOAL_RANK_LIST_BY_COLLABORATOR_GOAL:
        case types.GET_COLLABORATOR_GOAL_RANK_LIST_BY_TEAM_COLLABORATOR_GOAL:
            return {...state, ranks: null, loading: true, hasError: false}
            
        case types.GET_COLLABORATOR_GOAL_RANK_LIST_SUCCESS:
            return {...state, ranks: action.ranks, loading: false, hasError: false}

        case types.GET_COLLABORATOR_GOAL_RANK_LIST_ERROR:
            return {...state, ranks: null, loading: false, hasError: true}

        default:
            return state
    }
}

export default CollaboratorGoalRankList