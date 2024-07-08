import * as types from './actionTypes';

export const getCollaboratorPointSummary = (collaboratorId, periodId) => ({
  type: types.GET_COLLABORATOR_POINT_SUMMARY,
  collaboratorId,
  periodId,
});

export const getCollaboratorPointSummarySuccess = (summary) => ({
  type: types.GET_COLLABORATOR_POINT_SUMMARY_SUCCESS,
  summary,
});

export const getCollaboratorPointSummaryError = () => ({
  type: types.GET_COLLABORATOR_POINT_SUMMARY_ERROR,
});
