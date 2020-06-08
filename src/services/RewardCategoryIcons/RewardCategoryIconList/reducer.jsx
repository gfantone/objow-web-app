import * as types from './actionTypes';
import initialState from '../../../store/initialState';

const RewardCategoryIconList = (state = initialState.rewardCategoryIconList, action) => {
    switch (action.type) {
        case types.GET_USABLE_REWARD_CATEGORY_ICON_LIST:
            return {...state, icons: null, loading: true, hasError: false}

        case types.GET_REWARD_CATEGORY_ICON_LIST_SUCCESS:
            return {...state, icons: action.icons, loading: false, hasError: false}

        case types.GET_REWARD_CATEGORY_ICON_LIST_ERROR:
            return {...state, icons: null, loading: false, hasError: true}

        default:
            return state
    }
}

export default RewardCategoryIconList
