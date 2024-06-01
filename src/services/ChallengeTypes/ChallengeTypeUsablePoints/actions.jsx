import * as types from './actionTypes';

export const getChallengeTypeUsablePoints = (id, start, end, teamId) => {
  return {
    type: types.GET_CHALLENGE_TYPE_USABLE_POINTS,
    id,
    start,
    end,
    teamId,
  };
};

export const getChallengeTypeUsablePointsByChallenge = (
  challengeId,
  start = null,
  end = null,
) => {
  return {
    type: types.GET_CHALLENGE_TYPE_USABLE_POINTS_BY_CHALLENGE,
    challengeId,
    start,
    end,
  };
};

export const getChallengeTypeUsablePointsSuccess = (points) => {
  return {
    type: types.GET_CHALLENGE_TYPE_USABLE_POINTS_SUCCESS,
    points,
  };
};

export const getChallengeTypeUsablePointsError = () => {
  return {
    type: types.GET_CHALLENGE_TYPE_USABLE_POINTS_ERROR,
  };
};

export const clearChallengeTypeUsablePoints = () => {
  return {
    type: types.CLEAR_CHALLENGE_TYPE_USABLE_POINTS,
  };
};
