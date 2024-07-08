import * as actionTypes from './actionTypes';

export const getChallengeTypeSummaryList = (periodId) => {
  return {
    type: actionTypes.GET_CHALLENGE_TYPE_SUMMARY_LIST,
    periodId,
  };
};

export const getChallengeTypeSummaryListSuccess = (types) => {
  return {
    type: actionTypes.GET_CHALLENGE_TYPE_SUMMARY_LIST_SUCCESS,
    types,
  };
};

export const getChallengeTypeSummaryListError = () => {
  return {
    type: actionTypes.GET_CHALLENGE_TYPE_SUMMARY_LIST_ERROR,
  };
};
