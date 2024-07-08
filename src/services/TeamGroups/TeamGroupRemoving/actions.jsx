import * as types from './actionTypes';

export const removeTeamGroup = (id) => {
  return {
    type: types.REMOVE_TEAM_GROUP,
    id,
  };
};

export const removeTeamGroupSuccess = () => {
  return {
    type: types.REMOVE_TEAM_GROUP_SUCCESS,
  };
};

export const removeTeamGroupError = () => {
  return {
    type: types.REMOVE_TEAM_GROUP_ERROR,
  };
};

export const clearTeamGroupRemoving = () => {
  return {
    type: types.CLEAR_TEAM_GROUP_REMOVING,
  };
};
