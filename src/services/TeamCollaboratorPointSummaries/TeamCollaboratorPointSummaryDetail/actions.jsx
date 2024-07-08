import * as types from './actionTypes';

export const getTeamCollaboratorPointSummary = (teamId, periodId) => ({
  type: types.GET_TEAM_COLLABORATOR_POINT_SUMMARY,
  teamId,
  periodId,
});

export const getTeamCollaboratorPointSummarySuccesss = (summary) => ({
  type: types.GET_TEAM_COLLABORATOR_POINT_SUMMARY_SUCCESS,
  summary,
});

export const getTeamCollaboratorPointSummaryError = () => ({
  type: types.GET_TEAM_COLLABORATOR_POINT_SUMMARY_ERROR,
});
