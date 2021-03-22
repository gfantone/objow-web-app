import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let ChallengeDelete = (state = initialState.challengeDelete, action) => {
    switch (action.type) {
        case types.DELETE_CHALLENGE:
            return {...state, success: false, loading: true, hasError: false};

        case types.DELETE_CHALLENGE_SUCCESS:
            return {...state, success: true, loading: false, hasError: false};

        case types.DELETE_CHALLENGE_ERROR:
            return {...state, success: false, loading: false, hasError: true};

        case types.CLEAR_CHALLENGE_DELETE:
            return {...state, success: false, loading: false, hasError: false};

        default:
            return state;
    }
};

export default ChallengeDelete
