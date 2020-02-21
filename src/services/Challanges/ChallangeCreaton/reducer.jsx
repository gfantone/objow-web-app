import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let ChallengeCreation = (state = initialState.challengeCreation, action) => {
    switch (action.type) {
        case types.CREATE_CHALLENGE:
            return {...state, success: false, loading: true, hasError: false};
            
        case types.CREATE_CHALLENGE_SUCCESS:
            return {...state, success: true, loading: false, hasError: false};

        case types.CREATE_CHALLENGE_ERROR:
            return {...state, success: false, loading: false, hasError: true};

        case types.CLEAR_CHALLENGE_CREATION:
            return {...state, success: false, loading: false, hasError: false};

        default:
            return state;
    }
};

export default ChallengeCreation