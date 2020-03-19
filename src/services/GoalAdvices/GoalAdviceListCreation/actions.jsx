import * as types from './actionTypes'

export const createGoalAdviceList = (advices, goalId) => ({
    type: types.CREATE_GOAL_ADVICE_LIST,
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
