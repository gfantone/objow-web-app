import * as types from './actionTypes'

export const getGoalDefinitionLevelTeamPoints = (periodId) => {
    return {
        type: types.GET_GOAL_DEFINITION_LEVEL_TEAM_POINTS,
        periodId
    }
};

export const getGoalDefinitionLevelTeamPointsSuccess = ({usedPoints, currentPoints}) => {
    return {
        type: types.GET_GOAL_DEFINITION_LEVEL_TEAM_POINTS_SUCCESS,
        usedPoints,
        currentPoints
    }
};

export const getGoalDefinitionLevelTeamPointsError = () => {
    return {
        type: types.GET_GOAL_DEFINITION_LEVEL_TEAM_POINTS_ERROR
    }
};
