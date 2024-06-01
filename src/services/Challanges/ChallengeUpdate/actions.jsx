import * as types from './actionTypes';

export const updateChallenge = (
  challenge,
  challengeFormData,
  awards,
  goals,
  awardsEqual,
  goalsEqual,
) => {
  return {
    type: types.UPDATE_CHALLENGE,
    challenge,
    challengeFormData,
    awards,
    goals,
    awardsEqual,
    goalsEqual,
  };
};

export const updateChallengeSuccess = () => {
  return {
    type: types.UPDATE_CHALLENGE_SUCCESS,
  };
};

export const updateChallengeError = () => {
  return {
    type: types.UPDATE_CHALLENGE_ERROR,
  };
};

export const clearChallengeUpdate = () => {
  return {
    type: types.CLEAR_CHALLENGE_UPDATE,
  };
};
