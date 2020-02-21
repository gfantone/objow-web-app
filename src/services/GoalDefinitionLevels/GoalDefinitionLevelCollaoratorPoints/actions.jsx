import * as types from './actionTypes'

export const getGoalDefinitionLevelCollaboratorPoints = (periodId) => {
    return {
        type: types.GET_GOAL_DEFINITION_LEVEL_COLLABORATOR_POINTS,
        periodId
    }
};

export const getGoalDefinitionLevelCollaboratorPointsSuccess = (points) => {
    return {
        type: types.GET_GOAL_DEFINITION_LEVEL_COLLABORATOR_POINTS_SUCCESS,
        points
    }
};

export const getGoalDefinitionLevelCollaboratorPointsError = () => {
    return {
        type: types.GET_GOAL_DEFINITION_LEVEL_COLLABORATOR_POINTS_ERROR
    }
};