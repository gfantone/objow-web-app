import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let CollaboratorCategoryRankList = (state = initialState.collaboratorCategoryRankList, action) => {
    switch (action.type) {
        case types.GET_COLLABORATOR_CATEGORY_RANK_LIST_BY_CATEGORY:
        case types.GET_COLLABORATOR_CATEGORY_RANK_LIST_BY_COLLABORATOR:
            return {...state, ranks: null, loading: true, hasError: false}
            
        case types.GET_COLLABORATOR_CATEGORY_RANK_LIST_SUCCESS:
                return {...state, ranks: action.ranks, loading: false, hasError: false}

        case types.GET_COLLABORATOR_CATEGORY_RANK_LIST_ERROR:
                return {...state, rankranksing: null, loading: false, hasError: true}

        default:
            return state
    }
}

export default CollaboratorCategoryRankList