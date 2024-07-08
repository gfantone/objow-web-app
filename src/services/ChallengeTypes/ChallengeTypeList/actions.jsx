import * as actionTypes from './actionTypes';

export const getChallengeTypeList = (periodId) => {
  return {
    type: actionTypes.GET_CHALLENGE_TYPE_LIST,
    periodId,
  };
};

export const getCurrentChallengeTypeList = () => {
  return {
    type: actionTypes.GET_CURRENT_CHALLENGE_TYPE_LIST,
  };
};

export const getUsableChallengeTypeList = () => {
  return {
    type: actionTypes.GET_USABLE_CHALLENGE_TYPE_LIST,
  };
};

export const getChallengeTypeListSuccess = (types) => {
  return {
    type: actionTypes.GET_CHALLENGE_TYPE_LIST_SUCCESS,
    types,
  };
};

export const getChallengeTypeListError = () => {
  return {
    type: actionTypes.GET_CHALLENGE_TYPE_LIST_ERROR,
  };
};
