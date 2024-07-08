import * as types from './actionTypes';

export const createTeamGroup = (teamGroup, collaborators) => {
  return {
    type: types.CREATE_TEAM_GROUP,
    teamGroup,
    collaborators,
  };
};

export const createTeamGroupSuccess = () => {
  return {
    type: types.CREATE_TEAM_GROUP_SUCCESS,
  };
};

export const createTeamGroupError = () => {
  return {
    type: types.CREATE_TEAM_GROUP_ERROR,
  };
};

export const clearTeamGroupCreation = () => {
  return {
    type: types.CLEAR_TEAM_GROUP_CREATION,
  };
};
