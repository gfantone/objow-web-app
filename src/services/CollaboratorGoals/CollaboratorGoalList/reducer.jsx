import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let CollaboratorGoalList = (state = initialState.collaboratorGoalList, action) => {
    switch (action.type) {
        case types.GET_COLLABORATOR_GOAL_LIST_BY_TEAM_COLLABORATOR_GOAL:
            return { ...state, goals: null, loading: true, hasError: false }
            
        case types.GET_COLLABORATOR_GOAL_LIST_SUCCESS:
            return { ...state, goals: action.goals, loading: false, hasError: false }

        case types.GET_COLLABORATOR_GOAL_LIST_ERROR:
            return { ...state, goals: null, loading: false, hasError: true }

        default:
            return state
    }
}

export default CollaboratorGoalList