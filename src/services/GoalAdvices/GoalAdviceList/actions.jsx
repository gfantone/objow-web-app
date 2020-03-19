import * as types from './actionTypes'

export const getGoalAdviceListByCollaboratorGoal = (id) => ({
    type: types.GET_GOAL_ADVICE_LIST_BY_COLLABORATOR_GOAL,
    id
});

export const getGoalAdviceListByTeamCollaboratorGoal = (id) => ({
    type: types.GET_GOAL_ADVICE_LIST_BY_TEAM_COLLABORATOR_GOAL,
    id
});

export const getGoalAdviceListByTeamGoal = (id) => ({
    type: types.GET_GOAL_ADVICE_LIST_BY_TEAM_GOAL,
    id
});

export const getGoalAdviceListSuccess = (advices) => ({
    type: types.GET_GOAL_ADVICE_LIST_SUCCESS,
    advices
});

export const getGoalAdviceListError = () => ({
    type: types.GET_GOAL_ADVICE_LIST_ERROR
});
