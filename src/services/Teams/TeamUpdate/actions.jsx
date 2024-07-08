import * as types from './actionTypes';

export const updateTeam = (team, newCollaborators, oldCollaborators) => {
  return {
    type: types.UPDATE_TEAM,
    team,
    newCollaborators,
    oldCollaborators,
  };
};

export const updateTeamSuccess = () => {
  return {
    type: types.UPDATE_TEAM_SUCCESS,
  };
};

export const updateTeamError = () => {
  return {
    type: types.UPDATE_TEAM_ERROR,
  };
};

export const clearTeamUpdate = () => {
  return {
    type: types.CLEAR_TEAM_UPDATE,
  };
};
