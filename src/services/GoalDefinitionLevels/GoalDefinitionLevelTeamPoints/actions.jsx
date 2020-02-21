import * as types from './actionTypes'

export const getGoalDefinitionLevelTeamPoints = (periodId) => {
    return {
        type: types.GET_GOAL_DEFINITION_LEVEL_TEAM_POINTS,
        periodId
    }
};

export const getGoalDefinitionLevelTeamPointsSuccess = (points) => {
    return {
        type: types.GET_GOAL_DEFINITION_LEVEL_TEAM_POINTS_SUCCESS,
        points
    }
};

export const getGoalDefinitionLevelTeamPointsError = () => {
    return {
        type: types.GET_GOAL_DEFINITION_LEVEL_TEAM_POINTS_ERROR
    }
};