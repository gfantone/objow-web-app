import * as actionTypes from './actionTypes';
import initialState from '../../../store/initialState';

const ChallengeTypeListUpdate = (
  state = initialState.challengeTypeListUpdate,
  action,
) => {
  switch (action.type) {
    case actionTypes.UPDATE_CHALLENGE_TYPE_LIST:
      return { ...state, success: false, loading: true, hasError: false };

    case actionTypes.UPDATE_CHALLENGE_TYPE_LIST_SUCCESS:
      return { ...state, success: true, loading: false, hasError: false };

    case actionTypes.UPDATE_CHALLENGE_TYPE_LIST_ERROR:
      return { ...state, success: false, loading: false, hasError: true };

    case actionTypes.CLEAR_CHALLENGE_TYPE_LIST_UPDATE:
      return { ...state, success: false, loading: false, hasError: false };

    default:
      return state;
  }
};

export default ChallengeTypeListUpdate;
