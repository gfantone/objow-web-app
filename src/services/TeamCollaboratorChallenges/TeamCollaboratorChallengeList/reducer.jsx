import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let TeamCollaboratorChallengeList = (state = initialState.teamCollaboratorChallengeList, action) => {
    switch (action.type) {
        case types.GET_TEAM_COLLABORATOR_CHALLENGE_LIST:
            return {...state, challenges: null, loading: true, hasError: false};
            
        case types.GET_TEAM_COLLABORATOR_CHALLENGE_LIST_SUCCESS:
                return {...state, challenges: action.challenges, loading: false, hasError: false};

        case types.GET_TEAM_COLLABORATOR_CHALLENGE_LIST_ERROR:
                return {...state, challenges: null, loading: false, hasError: true};

        default:
            return state
    }
};

export default TeamCollaboratorChallengeList