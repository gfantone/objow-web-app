import * as types from './actionTypes';

export const getTeamGroupBasedChallengeGoalList = (challengeId) => {
  return {
    type: types.GET_TEAM_GROUP_BASED_CHALLENGE_GOAL_LIST,
    challengeId,
  };
};

export const getTeamGroupBasedChallengeGoalListByTeamGroup = (challengeId) => {
  return {
    type: types.GET_TEAM_GROUP_BASED_CHALLENGE_GOAL_LIST_BY_TEAM_GROUP,
    challengeId,
  };
};

export const getTeamGroupBasedChallengeGoalListSuccess = (goals) => {
  return {
    type: types.GET_TEAM_GROUP_BASED_CHALLENGE_GOAL_LIST_SUCCESS,
    goals,
  };
};

export const getTeamGroupBasedChallengeGoalListError = () => {
  return {
    type: types.GET_TEAM_GROUP_BASED_CHALLENGE_GOAL_LIST_ERROR,
  };
};
