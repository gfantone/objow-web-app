import * as types from './actionTypes';
import initialState from '../../../store/initialState';

const ChallengeParticipantList = (
  state = initialState.challengeParticipantList,
  action
) => {
  switch (action.type) {
    case types.GET_CHALLENGE_PARTICIPANT_LIST:
      return { ...state, participants: null, loading: true, hasError: false };

    case types.GET_CHALLENGE_PARTICIPANT_COLLABORATOR_LIST:
      return { ...state, participants: null, loading: true, hasError: false };

    case types.GET_CHALLENGE_PARTICIPANT_LIST_SUCCESS:
      return {
        ...state,
        participants: action.participants,
        loading: false,
        hasError: false,
      };

    case types.GET_CHALLENGE_PARTICIPANT_LIST_ERROR:
      return { ...state, participants: null, loading: false, hasError: true };

    default:
      return state;
  }
};

export default ChallengeParticipantList;
