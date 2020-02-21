import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let ChallengeDetail = (state = initialState.challengeDetail, action) => {
    switch (action.type) {
        case types.GET_CHALLENGE_DETAIL:
            return {...state, challenge: null, loading: true, hasError: false};

        case types.GET_CHALLENGE_DETAIL_SUCCESS:
            return {...state, challenge: action.challenge, loading: false, hasError: false};

        case types.GET_CHALLENGE_DETAIL_ERROR:
            return {...state, challenge: null, loading: false, hasError: true};

        default:
            return state;
    }
};

export default ChallengeDetail