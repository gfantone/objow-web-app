import * as types from './actionTypes';

export const getGoalDefinitionLevelCollaboratorPoints = (periodId) => {
  return {
    type: types.GET_GOAL_DEFINITION_LEVEL_COLLABORATOR_POINTS,
    periodId,
  };
};

export const getGoalDefinitionLevelCollaboratorPointsByCollaborator = (
  periodId,
  collaboratorId,
) => {
  return {
    type: types.GET_GOAL_DEFINITION_LEVEL_COLLABORATOR_POINTS_BY_COLLABORATOR,
    periodId,
    collaboratorId,
  };
};

export const getGoalDefinitionLevelCollaboratorPointsByTeam = (
  periodId,
  teamId,
) => {
  return {
    type: types.GET_GOAL_DEFINITION_LEVEL_COLLABORATOR_POINTS_BY_TEAM,
    periodId,
    teamId,
  };
};

export const getGoalDefinitionLevelCollaboratorPointsSuccess = ({
  usedPoints,
  currentPoints,
}) => {
  return {
    type: types.GET_GOAL_DEFINITION_LEVEL_COLLABORATOR_POINTS_SUCCESS,
    usedPoints,
    currentPoints,
  };
};

export const getGoalDefinitionLevelCollaboratorPointsError = () => {
  return {
    type: types.GET_GOAL_DEFINITION_LEVEL_COLLABORATOR_POINTS_ERROR,
  };
};
