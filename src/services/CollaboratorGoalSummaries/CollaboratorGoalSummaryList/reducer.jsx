import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let CollaboratorGoalSummaryList = (state = initialState.collaboratorGoalSummaryList, action) => {
    switch (action.type) {
        case types.GET_COLLABORATOR_GOAL_SUMMARY_LIST:
            return { ...state, goals: null, loading: true, hasError: false }
            
        case types.GET_COLLABORATOR_GOAL_SUMMARY_LIST_SUCCESS:
            return { ...state, goals: action.goals, loading: false, hasError: false }

        case types.GET_COLLABORATOR_GOAL_SUMMARY_LIST_ERROR:
            return { ...state, goals: null, loading: false, hasError: true }

        default:
            return state
    }
}

export default CollaboratorGoalSummaryList