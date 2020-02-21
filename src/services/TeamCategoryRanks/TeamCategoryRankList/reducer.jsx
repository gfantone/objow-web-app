import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let TeamCategoryRankList = (state = initialState.teamCategoryRankList, action) => {
    switch (action.type) {
        case types.GET_TEAM_CATEGORY_RANK_LIST_BY_CATEGORY:
        case types.GET_TEAM_CATEGORY_RANK_LIST_BY_TEAM:
            return {...state, ranks: null, loading: true, hasError: false}
            
        case types.GET_TEAM_CATEGORY_RANK_LIST_SUCCESS:
                return {...state, ranks: action.ranks, loading: false, hasError: false}

        case types.GET_TEAM_CATEGORY_RANK_LIST_ERROR:
                return {...state, ranks: null, loading: false, hasError: true}

        default:
            return state
    }
}

export default TeamCategoryRankList