import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let UserPlayerCategoryRankList = (state = initialState.userPlayerCategoryRankList, action) => {
    switch (action.type) {
        case types.GET_USER_PLAYER_CATEGORY_RANK_LIST:
            return {...state, ranks: [], loading: true, hasError: false}
            
        case types.GET_USER_PLAYER_CATEGORY_RANK_LIST_SUCCESS:
                return {...state, ranks: action.ranks, loading: false, hasError: false}

        case types.GET_USER_PLAYER_CATEGORY_RANK_LIST_ERROR:
                return {...state, ranks: [], loading: false, hasError: true}

        default:
            return state;
    }
}

export default UserPlayerCategoryRankList;