import * as types from './actionTypes'

export const getGoalDefinitionLevelTeamPoints = (periodId) => {
    return {
        type: types.GET_GOAL_DEFINITION_LEVEL_TEAM_POINTS,
        periodId
    }
};

export const getGoalDefinitionLevelTeamPointsByCollaborator = (periodId, collaboratorId) => {
    return {
        type: types.GET_GOAL_DEFINITION_LEVEL_TEAM_POINTS_BY_COLLABORATOR,
        periodId,
        collaboratorId
    }
};

export const getGoalDefinitionLevelTeamPointsByTeam = (periodId, teamId) => {
    return {
        type: types.GET_GOAL_DEFINITION_LEVEL_TEAM_POINTS_BY_TEAM,
        periodId,
        teamId
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
