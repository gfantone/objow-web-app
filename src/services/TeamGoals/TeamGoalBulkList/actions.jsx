import * as types from './actionTypes'

export const getTeamGoalBulkList = (definitionId, dates) => {
    return {
        type: types.GET_TEAM_GOAL_BULK_LIST,
        definitionId,
        dates
    }
}

export const getTeamGoalBulkListSuccess = (goals) => {
    return {
        type: types.GET_TEAM_GOAL_BULK_LIST_SUCCESS,
        goals
    }
}

export const getTeamGoalBulkListError = () => {
    return {
        type: types.GET_TEAM_GOAL_BULK_LIST_ERROR
    }
}
