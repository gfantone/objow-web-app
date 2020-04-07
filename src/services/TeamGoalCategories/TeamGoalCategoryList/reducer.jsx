import * as types from './actionTypes';
import initialState from '../../../store/initialState';

const TeamGoalCategoryList = (state = initialState.teamGoalCategoryList, action) => {
    switch (action.type) {
        case types.GET_TEAM_GOAL_CATEGORY_LIST:
            return {...state, categories: null, loading: true, hasError: false};

        case types.GET_TEAM_GOAL_CATEGORY_LIST_SUCCESS:
            return {...state, categories: action.categories, loading: false, hasError: false};

        case types.GET_TEAM_GOAL_CATEGORY_LIST_ERROR:
            return {...state, categories: null, loading: false, hasError: true};

        default:
            return state
    }
};

export default TeamGoalCategoryList
