import * as types from './actionTypes';

export const getCollaboratorChallengeRankListByCollaboratorChallenge = (
  challengeId,
  page,
  team,
  teamGroup,
  search,
) => {
  return {
    type: types.GET_COLLABORATOR_CHALLENGE_RANK_LIST_BY_COLLABORATOR_CHALLENGE,
    challengeId,
    page,
    team,
    teamGroup,
    search,
  };
};

export const getCollaboratorChallengeRankListByTeamCollaboratorChallenge = (
  challengeId,
  page,
  team,
  teamGroup,
  search,
) => {
  return {
    type: types.GET_COLLABORATOR_CHALLENGE_RANK_LIST_BY_TEAM_COLLABORATOR_CHALLENGE,
    challengeId,
    page,
    team,
    teamGroup,
    search,
  };
};

export const getCollaboratorChallengeRankListByTeamGroupCollaboratorChallenge =
  (challengeId, page, team, teamGroup, search, abortSignal) => {
    return {
      type: types.GET_COLLABORATOR_CHALLENGE_RANK_LIST_BY_TEAM_GROUP_COLLABORATOR_CHALLENGE,
      challengeId,
      page,
      team,
      teamGroup,
      search,
      abortSignal,
    };
  };

export const getCollaboratorChalengeRankListSuccess = (ranks) => {
  return {
    type: types.GET_COLLABORATOR_CHALLENGE_RANK_LIST_SUCCESS,
    ranks,
  };
};

export const getCollaboratorChalengeRankListError = () => {
  return {
    type: types.GET_COLLABORATOR_CHALLENGE_RANK_LIST_ERROR,
  };
};

export const getCollaboratorChallengeRankListClear = () => {
  return {
    type: types.GET_COLLABORATOR_CHALLENGE_RANK_LIST_CLEAR,
  };
};
