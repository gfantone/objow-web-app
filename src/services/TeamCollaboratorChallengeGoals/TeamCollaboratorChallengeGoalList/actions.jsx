import * as types from './actionTypes';

export const getTeamCollaboratorChallengeGoalList = (challengeId) => {
  return {
    type: types.GET_TEAM_COLLABORATOR_CHALLENGE_GOAL_LIST,
    challengeId,
  };
};

export const getTeamCollaboratorChallengeGoalListSuccess = (goals) => {
  return {
    type: types.GET_TEAM_COLLABORATOR_CHALLENGE_GOAL_LIST_SUCCESS,
    goals,
  };
};

export const getTeamCollaboratorChallengeGoalListError = () => {
  return {
    type: types.GET_TEAM_COLLABORATOR_CHALLENGE_GOAL_LIST_ERROR,
  };
};
