import * as types from './actionTypes';

export const getGoalPoints = () => {
    return {
        type: types.GET_GOAL_POINTS
    }
}

export const getGoalPointsSuccess = (points) => {
    return {
        type: types.GET_GOAL_POINTS_SUCCESS,
        points
    }
}

export const getGoalPointsError = () => {
    return {
        type: types.GET_GOAL_POINTS_ERROR
    }
}