import * as types from './actionTypes'

export const getTeamGoalBulkListByDefinition = (definitionId, dates) => {
    return {
        type: types.GET_TEAM_GOAL_BULK_LIST_BY_DEFINITION,
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
