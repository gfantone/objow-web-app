import * as types from './actionTypes';

export const getCollaboratorGlobalPointSummary = (periodId) => ({
  type: types.GET_COLLABORATOR_GLOBAL_POINT_SUMMARY,
  periodId,
});

export const getCollaboratorGlobalPointSummarySuccess = (summary) => ({
  type: types.GET_COLLABORATOR_GLOBAL_POINT_SUMMARY_SUCCESS,
  summary,
});

export const getCollaboratorGlobalPointSummaryError = () => ({
  type: types.GET_COLLABORATOR_GLOBAL_POINT_SUMMARY_ERROR,
});
