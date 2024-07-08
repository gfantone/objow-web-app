import * as types from './actionTypes';

export const updateTeamGroup = (
  teamGroup,
  newCollaborators,
  oldCollaborators,
) => {
  return {
    type: types.UPDATE_TEAM_GROUP,
    teamGroup,
    newCollaborators,
    oldCollaborators,
  };
};

export const updateTeamGroupSuccess = () => {
  return {
    type: types.UPDATE_TEAM_GROUP_SUCCESS,
  };
};

export const updateTeamGroupError = () => {
  return {
    type: types.UPDATE_TEAM_GROUP_ERROR,
  };
};

export const clearTeamGroupUpdate = () => {
  return {
    type: types.CLEAR_TEAM_GROUP_UPDATE,
  };
};
