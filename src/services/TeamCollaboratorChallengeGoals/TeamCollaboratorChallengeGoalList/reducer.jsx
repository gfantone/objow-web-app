import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let TeamCollaboratorChallengeGoalList = (state = initialState.teamCollaboratorChallengeGoalList, action) => {
    switch (action.type) {
        case types.GET_TEAM_COLLABORATOR_CHALLENGE_GOAL_LIST:
            return {...state, goals: null, loading: true, hasError: false}
            
        case types.GET_TEAM_COLLABORATOR_CHALLENGE_GOAL_LIST_SUCCESS:
                return {...state, goals: action.goals, loading: false, hasError: false}

        case types.GET_TEAM_COLLABORATOR_CHALLENGE_GOAL_LIST_ERROR:
                return {...state, goals: null, loading: false, hasError: true}

        default:
            return state
    }
}

export default TeamCollaboratorChallengeGoalList