import * as types from './actionTypes'

export const updateTeamPlayerGoalList = (goals) => {
    return {
        type: types.UPDATE_TEAM_PLAYER_GOAL_LIST,
        goals
    }
}

export const updateTeamPlayerGoalListSuccess = () => {
    return {
        type: types.UPDATE_TEAM_PLAYER_GOAL_LIST_SUCCESS
    }
}

export const updateTeamPlayerGoalListError = () => {
    return {
        type: types.UPDATE_TEAM_PLAYER_GOAL_LIST_ERROR
    }
}