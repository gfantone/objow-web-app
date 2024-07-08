import * as types from './actionTypes';

export const getChallengeSummary = (
  challenge_id,
  collaborator,
  team,
  team_group,
) => {
  return {
    type: types.GET_CHALLENGE_SUMMARY,
    challenge_id,
    collaborator,
    team,
    team_group,
  };
};

export const getChallengeSummarySuccess = (summary) => {
  return {
    type: types.GET_CHALLENGE_SUMMARY_SUCCESS,
    summary,
  };
};

export const getChallengeSummaryError = () => {
  return {
    type: types.GET_CHALLENGE_SUMMARY_ERROR,
  };
};

export const getChallengeSummaryClear = () => {
  return {
    type: types.GET_CHALLENGE_SUMMARY_CLEAR,
  };
};
