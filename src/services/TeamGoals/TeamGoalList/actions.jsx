import * as types from './actionTypes'

export const getTeamGoalListByDefinition = (definitionId, date) => {
    return {
        type: types.GET_TEAM_GOAL_LIST_BY_DEFINITION,
        definitionId,
        date
    }
}

export const getTeamGoalListSuccess = (goals) => {
    return {
        type: types.GET_TEAM_GOAL_LIST_SUCCESS,
        goals
    }
}

export const getTeamGoalListError = () => {
    return {
        type: types.GET_TEAM_GOAL_LIST_ERROR
    }
}