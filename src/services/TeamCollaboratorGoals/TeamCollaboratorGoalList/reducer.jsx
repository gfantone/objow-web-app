import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let TeamCollaboratorGoalList = (state = initialState.teamCollaboratorGoalList, action) => {
    switch (action.type) {
        case types.GET_TEAM_COLLABORATOR_GOAL_LIST:
        case types.GET_TEAM_COLLABORATOR_GOAL_LIST_BY_DEFINITION_AND_TEAM:
            return {...state, goals: null, loading: true, hasError: false}

        case types.GET_EMPTY_TEAM_COLLABORATOR_GOAL_LIST:
            return {...state, goals: [], loading: false, hasError: false}

        case types.GET_TEAM_COLLABORATOR_GOAL_LIST_SUCCESS:
                return {...state, goals: action.goals, loading: false, hasError: false}

        case types.GET_TEAM_COLLABORATOR_GOAL_LIST_ERROR:
                return {...state, goals: null, loading: false, hasError: true}

        case types.CLEAR_TEAM_COLLABORATOR_GOAL_LIST:
            return {...state, goals: null, loading: false, hasError: false}

        default:
            return state
    }
}

export default TeamCollaboratorGoalList
