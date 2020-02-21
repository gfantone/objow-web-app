import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let TeamChallengeList = (state = initialState.teamChallengeList, action) => {
    switch (action.type) {
        case types.GET_TEAM_CHALLENGE_LIST_BY_COLLABORATOR:
        case types.GET_TEAM_CHALLENGE_LIST_BY_TEAM:
            return {...state, challenges: null, loading: true, hasError: false};
            
        case types.GET_TEAM_CHALLENGE_LIST_SUCCESS:
                return {...state, challenges: action.challenges, loading: false, hasError: false};

        case types.GET_TEAM_CHALLENGE_LIST_ERROR:
                return {...state, challenges: null, loading: false, hasError: true};

        default:
            return state
    }
};

export default TeamChallengeList