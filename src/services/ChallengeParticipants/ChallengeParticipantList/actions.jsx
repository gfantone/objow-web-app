import * as types from './actionTypes';

export const getChallengeParticipantList = () => {
  return {
    type: types.GET_CHALLENGE_PARTICIPANT_LIST,
  };
};

export const getChallengeParticipantCollaboratorList = ({
  challengeId,
  search,
  page,
}) => {
  return {
    type: types.GET_CHALLENGE_PARTICIPANT_COLLABORATOR_LIST,
    challengeId,
    search,
    page,
  };
};

export const getChallengeParticipantListSuccess = (participants) => {
  return {
    type: types.GET_CHALLENGE_PARTICIPANT_LIST_SUCCESS,
    participants,
  };
};

export const getChallengeParticipantListError = () => {
  return {
    type: types.GET_CHALLENGE_PARTICIPANT_LIST_ERROR,
  };
};
