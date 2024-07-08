import * as types from './actionTypes';

export const getTeamGroupList = (full, abortController) => {
  return {
    type: types.GET_TEAM_GROUP_LIST,
    full,
    abortController,
  };
};

export const getTeamGroupListSuccess = (teamGroups) => {
  return {
    type: types.GET_TEAM_GROUP_LIST_SUCCESS,
    teamGroups,
  };
};

export const getTeamGroupListError = () => {
  return {
    type: types.GET_TEAM_GROUP_LIST_ERROR,
  };
};
