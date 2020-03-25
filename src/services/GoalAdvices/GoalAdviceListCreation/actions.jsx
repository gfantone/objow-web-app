import * as types from './actionTypes'

export const createGoalAdviceListByCollaboratorGoal = (advices, goalId) => ({
    type: types.CREATE_GOAL_ADVICE_LIST_BY_COLLABORATOR_GOAL,
    advices,
    goalId
});

export const createGoalAdviceListByTeamCollaboratorGoal = (advices, goalId) => ({
    type: types.CREATE_GOAL_ADVICE_LIST_BY_TEAM_COLLABORATOR_GOAL,
    advices,
    goalId
});

export const createGoalAdviceListByTeamGoal = (advices, goalId) => ({
    type: types.CREATE_GOAL_ADVICE_LIST_BY_TEAM_GOAL,
    advices,
    goalId
});

export const createGoalAdviceListSuccess = () => ({
    type: types.CREATE_GOAL_ADVICE_LIST_SUCCESS
});

export const createGoalAdviceListError = () => ({
    type: types.CREATE_GOAL_ADVICE_LIST_ERROR
});

export const clearGoalAdviceListCreation = () => ({
    type: types.CLEAR_GOAL_ADVICE_LIST_CREATION
});
