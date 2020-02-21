import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let TeamChallengeGeneralRankDetail = (state = initialState.teamChallengeGeneralRankDetail, action) => {
    switch (action.type) {
        case types.GET_TEAM_CHALLENGE_GENERAL_RANK_DETAIL:
            return {...state, rank: null, loading: true, hasError: false}
            
        case types.GET_TEAM_CHALLENGE_GENERAL_RANK_DETAIL_SUCCESS:
                return {...state, rank: action.rank, loading: false, hasError: false}

        case types.GET_TEAM_CHALLENGE_GENERAL_RANK_DETAIL_ERROR:
                return {...state, rank: null, loading: false, hasError: true}

        default:
            return state
    }
}

export default TeamChallengeGeneralRankDetail