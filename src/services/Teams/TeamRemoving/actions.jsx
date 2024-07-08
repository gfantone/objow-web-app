import * as types from './actionTypes';

export const removeTeam = (id) => {
  return {
    type: types.REMOVE_TEAM,
    id,
  };
};

export const removeTeamSuccess = () => {
  return {
    type: types.REMOVE_TEAM_SUCCESS,
  };
};

export const removeTeamError = () => {
  return {
    type: types.REMOVE_TEAM_ERROR,
  };
};

export const clearTeamRemoving = () => {
  return {
    type: types.CLEAR_TEAM_REMOVING,
  };
};
