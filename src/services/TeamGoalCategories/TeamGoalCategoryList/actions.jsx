import * as types from './actionTypes'

export const getTeamGoalCategoryList = (id, year) => ({
    type: types.GET_TEAM_GOAL_CATEGORY_LIST,
    id,
    year
});

export const getTeamGoalCategoryListSuccess = (categories) => ({
    type: types.GET_TEAM_GOAL_CATEGORY_LIST_SUCCESS,
    categories
});

export const getTeamGoalCategoryListError = () => ({
    type: types.GET_TEAM_GOAL_CATEGORY_LIST_ERROR
});
