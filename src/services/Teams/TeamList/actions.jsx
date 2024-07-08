import * as types from './actionTypes';

export const getTeamList = (options) => {
  return {
    type: types.GET_TEAM_LIST,
    ...options,
  };
};

export const getTeamListSuccess = (teams) => {
  return {
    type: types.GET_TEAM_LIST_SUCCESS,
    teams,
  };
};

export const getTeamListError = () => {
  return {
    type: types.GET_TEAM_LIST_ERROR,
  };
};
