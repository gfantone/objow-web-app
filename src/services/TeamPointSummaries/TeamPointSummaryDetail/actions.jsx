import * as types from './actionTypes';

export const getTeamPointSummaryByCollaborator = (
  collaboratorId,
  periodId,
) => ({
  type: types.GET_TEAM_POINT_SUMMARY_DETAIL_BY_COLLABORATOR,
  collaboratorId,
  periodId,
});

export const getTeamPointSummaryByTeam = (teamId, periodId) => ({
  type: types.GET_TEAM_POINT_SUMMARY_DETAIL_BY_TEAM,
  teamId,
  periodId,
});

export const getTeamPointSummarySuccess = (summary) => ({
  type: types.GET_TEAM_POINT_SUMMARY_DETAIL_SUCCESS,
  summary,
});

export const getTeamPointSummaryError = () => ({
  type: types.GET_TEAM_POINT_SUMMARY_DETAIL_ERROR,
});
