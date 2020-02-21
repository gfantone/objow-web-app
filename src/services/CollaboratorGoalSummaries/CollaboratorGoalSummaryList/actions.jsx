import * as types from './actionTypes'

export const getCollaboratorGoalSummaryList = (id, current, category, year, start, end) => {
    return {
        type: types.GET_COLLABORATOR_GOAL_SUMMARY_LIST,
        id,
        current,
        category,
        year,
        start,
        end
    }
};

export const getCollaboratorGoalSummaryListSuccess = (goals) => {
    return {
        type: types.GET_COLLABORATOR_GOAL_SUMMARY_LIST_SUCCESS,
        goals
    }
};

export const getCollaboratorGoalSummaryListError = () => {
    return {
        type: types.GET_COLLABORATOR_GOAL_SUMMARY_LIST_ERROR
    }
};