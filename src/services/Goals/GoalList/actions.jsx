import * as types from './actionTypes'

export const getGoalList = (definitionId) => {
    return {
        type: types.GET_GOAL_LIST,
        definitionId
    }
}

export const getGoalListSuccess = (goals) => {
    return {
        type: types.GET_GOAL_LIST_SUCCESS,
        goals
    }
}

export const getGoalListError = () => {
    return {
        type: types.GET_GOAL_LIST_ERROR
    }
}