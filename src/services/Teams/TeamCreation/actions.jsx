import * as types from './actionTypes';

export const createTeam = (team, collaborators) => {
  return {
    type: types.CREATE_TEAM,
    team,
    collaborators,
  };
};

export const createTeamSuccess = () => {
  return {
    type: types.CREATE_TEAM_SUCCESS,
  };
};

export const createTeamError = () => {
  return {
    type: types.CREATE_TEAM_ERROR,
  };
};

export const clearTeamCreation = () => {
  return {
    type: types.CLEAR_TEAM_CREATION,
  };
};
