import * as types from './actionTypes';

export const getTeamDetail = (id) => {
  return {
    type: types.GET_TEAM_DETAIL,
    id,
  };
};

export const getTeamDetailByAccount = () => {
  return {
    type: types.GET_TEAM_DETAIL_BY_ACCOOUNT,
  };
};

export const getTeamDetailSuccess = (team) => {
  return {
    type: types.GET_TEAM_DETAIL_SUCCESS,
    team,
  };
};

export const getTeamDetailError = () => {
  return {
    type: types.GET_TEAM_DETAIL_ERROR,
  };
};

export const clearTeamDetail = () => {
  return {
    type: types.CLEAR_TEAM_DETAIL,
  };
};
