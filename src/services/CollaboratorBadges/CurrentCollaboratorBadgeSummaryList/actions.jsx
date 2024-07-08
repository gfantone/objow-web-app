import * as types from './actionTypes';

export const getCurrentCollaboratorBadgeSummaryList = (
  collaboratorId,
  year,
) => {
  return {
    type: types.GET_CURRENT_COLLABORATOR_BADGE_SUMMARY_LIST,
    collaboratorId,
    year,
  };
};

export const getCurrentCollaboratorBadgeSummaryListSuccess = (badges) => {
  return {
    type: types.GET_CURRENT_COLLABORATOR_BADGE_SUMMARY_LIST_SUCCESS,
    badges,
  };
};

export const getCurrentCollaboratorBadgeSummaryListError = () => {
  return {
    type: types.GET_CURRENT_COLLABORATOR_BADGE_SUMMARY_LIST_ERROR,
  };
};
