import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let TeamGoalSummaryList = (state = initialState.teamGoalSummaryList, action) => {
    switch (action.type) {
        case types.GET_TEAM_GOAL_SUMMARY_LIST_BY_COLLABORATOR:
        case types.GET_TEAM_GOAL_SUMMARY_LIST_BY_TEAM:
            return { ...state, goals: null, loading: true, hasError: false }
            
        case types.GET_TEAM_GOAL_SUMMARY_LIST_SUCCESS:
                return { ...state, goals: action.goals, loading: false, hasError: false }

        case types.GET_TEAM_GOAL_SUMMARY_LIST_ERROR:
                return { ...state, goals: null, loading: false, hasError: true }

        default:
            return state
    }
}

export default TeamGoalSummaryList