import * as types from './actionTypes'

export const getBadgeLevelRemainingPoints = (periodId) => {
    return {
        type: types.GET_BADGE_LEVEL_REMAINING_POINTS,
        periodId
    }
};

export const getBadgeLevelRemainingPointsSuccess = (points) => {
    return {
        type: types.GET_BADGE_LEVEL_REMAINING_POINTS_SUCCESS,
        points
    }
};

export const getBadgeLevelRemainingPointsError = () => {
    return {
        type: types.GET_BADGE_LEVEL_REMAINING_POINTS_ERROR
    }
};