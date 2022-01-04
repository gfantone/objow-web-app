import * as types from './actionTypes'

export const getTeamList = () => {
    return {
        type: types.GET_TEAM_LIST
    }
}

export const getTeamListSuccess = (teams) => {
    return {
        type: types.GET_TEAM_LIST_SUCCESS,
        teams
    }
}

export const getTeamListError = () => {
    return {
        type: types.GET_TEAM_LIST_ERROR
    }
}
