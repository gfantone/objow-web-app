import * as types from './actionTypes';

export const getTeamGroupCollaboratorChallengeGoalList = (challengeId) => {
  return {
    type: types.GET_TEAM_GROUP_COLLABORATOR_CHALLENGE_GOAL_LIST,
    challengeId,
  };
};

export const getTeamGroupCollaboratorChallengeGoalListSuccess = (goals) => {
  return {
    type: types.GET_TEAM_GROUP_COLLABORATOR_CHALLENGE_GOAL_LIST_SUCCESS,
    goals,
  };
};

export const getTeamGroupCollaboratorChallengeGoalListError = () => {
  return {
    type: types.GET_TEAM_GROUP_COLLABORATOR_CHALLENGE_GOAL_LIST_ERROR,
  };
};
