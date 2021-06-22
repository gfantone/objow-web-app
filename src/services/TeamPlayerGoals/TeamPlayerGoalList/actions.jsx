import * as types from './actionTypes'

export const getTeamPlayerGoalList = (definitionId, date) => {
    return {
        type: types.GET_TEAM_PLAYER_GOAL_LIST,
        definitionId,
        date
    }
}

export const getTeamPlayerGoalListSuccess = (goals) => {
    return {
        type: types.GET_TEAM_PLAYER_GOAL_LIST_SUCCESS,
        goals
    }
}

export const getTeamPlayerGoalListError = () => {
    return {
        type: types.GET_TEAM_PLAYER_GOAL_LIST_ERROR
    }
}
