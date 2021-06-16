import * as types from './actionTypes'

export const getTeamPlayerGoalBulkList = (definitionId, dates) => {
    return {
        type: types.GET_TEAM_PLAYER_GOAL_BULK_LIST,
        definitionId,
        dates
    }
}

export const getTeamPlayerGoalBulkListSuccess = (goals) => {
    return {
        type: types.GET_TEAM_PLAYER_GOAL_BULK_LIST_SUCCESS,
        goals
    }
}

export const getTeamPlayerGoalBulkListError = () => {
    return {
        type: types.GET_TEAM_PLAYER_GOAL_BULK_LIST_ERROR
    }
}
