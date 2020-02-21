import * as types from './actionTypes'

export const getGoalDetail = (definitionId, date) => {
    return {
        type: types.GET_GOAL_DETAIL,
        definitionId,
        date,
    }
}

export const getGoalDetailSuccess = (goal) => {
    return {
        type: types.GET_GOAL_DETAIL_SUCCESS,
        goal
    }
}

export const getGoalDetailError = () => {
    return {
        type: types.GET_GOAL_DETAIL_ERROR
    }
}