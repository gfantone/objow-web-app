import * as actionTypes from './actionTypes';
import initialState from '../../../store/initialState';

const ChallengeTypeUsablePoints = (state = initialState.challengeTypeUsablePoints, action) => {
    switch (action.type) {
        case actionTypes.GET_CHALLENGE_TYPE_USABLE_POINTS:
        case actionTypes.GET_CHALLENGE_TYPE_USABLE_POINTS_BY_CHALLENGE:
            return { ...state, points: null, loading: true, hasError: false };

        case actionTypes.GET_CHALLENGE_TYPE_USABLE_POINTS_SUCCESS:
            return { ...state, points: action.points, loading: false, hasError: false };

        case actionTypes.GET_CHALLENGE_TYPE_USABLE_POINTS_ERROR:
            return { ...state, points: null, loading: false, hasError: true };

        case actionTypes.CLEAR_CHALLENGE_TYPE_USABLE_POINTS:
            return { ...state, points: null, loading: false, hasError: false };

        default:
            return state;
    }
};

export default ChallengeTypeUsablePoints