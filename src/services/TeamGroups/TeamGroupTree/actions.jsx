import * as types from './actionTypes';

export const getTeamGroupTree = (full, admin, abortController) => {
  return {
    type: types.GET_TEAM_GROUP_TREE,
    full,
    admin,
    abortController,
  };
};

export const getTeamGroupTreeSuccess = (teamGroup) => {
  return {
    type: types.GET_TEAM_GROUP_TREE_SUCCESS,
    teamGroup,
  };
};

export const getTeamGroupTreeError = () => {
  return {
    type: types.GET_TEAM_GROUP_TREE_ERROR,
  };
};
