import * as types from './actionTypes'

export const updateGoalList = (goals) => {
    return {
        type: types.UPDATE_GOAL_LIST,
        goals
    }
}

export const updateGoalListSuccess = () => {
    return {
        type: types.UPDATE_GOAL_LIST_SUCCESS
    }
}

export const updateGoalListError = () => {
    return {
        type: types.UPDATE_GOAL_LIST_ERROR
    }
}