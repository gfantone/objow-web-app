import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let ChallengeUpdate = (state = initialState.challengeUpdate, action) => {
  switch (action.type) {
    case types.UPDATE_CHALLENGE:
      return { ...state, success: false, loading: true, hasError: false };

    case types.UPDATE_CHALLENGE_SUCCESS:
      return { ...state, success: true, loading: false, hasError: false };

    case types.UPDATE_CHALLENGE_ERROR:
      return { ...state, success: false, loading: false, hasError: true };

    case types.CLEAR_CHALLENGE_UPDATE:
      return { ...state, success: false, loading: false, hasError: false };

    default:
      return state;
  }
};

export default ChallengeUpdate;
