import * as types from './actionTypes';
import initialState from '../../../store/initialState';

const ChallengeImageList = (
  state = initialState.challengeImageList,
  action,
) => {
  switch (action.type) {
    case types.GET_CHALLENGE_IMAGE_LIST:
      return { ...state, images: null, loading: true, hasError: false };

    case types.GET_CHALLENGE_IMAGE_LIST_SUCCESS:
      return {
        ...state,
        images: action.images,
        loading: false,
        hasError: false,
      };

    case types.GET_CHALLENGE_IMAGE_LIST_ERROR:
      return { ...state, images: null, loading: false, hasError: true };

    default:
      return state;
  }
};

export default ChallengeImageList;
