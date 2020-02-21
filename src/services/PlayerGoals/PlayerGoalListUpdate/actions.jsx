import * as types from './actionTypes';

export const updatePlayerGoalList = (goals) => {
    return {
        type: types.UPDATE_PLAYER_GOAL_LIST,
        goals
    }
}

export const updatePlayerGoalListSuccess = () => {
    return {
        type: types.UPDATE_PLAYER_GOAL_LIST_SUCCESS
    }
}

export const updatePlayerGoalListError = () => {
    return {
        type: types.UPDATE_PLAYER_GOAL_LIST_ERROR
    }
}