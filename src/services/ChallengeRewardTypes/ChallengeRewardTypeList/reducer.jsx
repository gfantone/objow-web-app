import * as actionTypes from './actionTypes';
import initialState from '../../../store/initialState';

const ChallengeRewardTypeList = (state = initialState.challengeRewardTypeList, action) => {
    switch (action.type) {
        case actionTypes.GET_CHALLENGE_REWARD_TYPE_LIST:
            return {...state, types: null, loading: true, hasError: false};

        case actionTypes.GET_CHALLENGE_REWARD_TYPE_LIST_SUCCESS:
            return {...state, types: action.types, loading: false, hasError: false};

        case actionTypes.GET_CHALLENGE_REWARD_TYPE_LIST_ERROR:
            return {...state, types: null, loading: false, hasError: true};

        default:
            return state;
    }
};

export default ChallengeRewardTypeList
