import * as types from './actionTypes'

export const getUserGoalDetail = (id) => {
    return {
        type: types.GET_USER_GOAL_DETAIL,
        id
    }
}

export const getUserGoalDetailSuccess = (goal, ranking, indications, playerGoals) => {
    return {
        type: types.GET_USER_GOAL_DETAIL_SUCCESS,
        goal,
        ranking,
        indications,
        playerGoals
    }
}

export const getUserGoalDetailError = () => {
    return {
        type: types.GET_USER_GOAL_DETAIL_ERROR
    }
}