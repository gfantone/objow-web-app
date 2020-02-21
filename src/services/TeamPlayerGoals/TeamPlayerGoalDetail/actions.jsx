import * as types from './actionTypes'

export const getTeamPlayerGoalDetail = (definitionId, date, team) => {
    return {
        type: types.GET_TEAM_PLAYER_GOAL_DETAIL,
        definitionId,
        date,
        team
    }
}

export const getTeamPlayerGoalDetailSuccess = (goal) => {
    return {
        type: types.GET_TEAM_PLAYER_GOAL_DETAIL_SUCCESS,
        goal
    }
}

export const getTeamPlayerGoalDetailError = () => {
    return {
        type: types.GET_TEAM_PLAYER_GOAL_DETAIL_ERROR
    }
}