import * as types from './actionTypes'

export const getTeamGlobalPointSummary = (periodId) => ({
    type: types.GET_TEAM_GLOBAL_POINT_SUMMARY,
    periodId
})

export const getTeamGlobalPointSummarySuccess = (summary) => ({
    type: types.GET_TEAM_GLOBAL_POINT_SUMMARY_SUCCESS,
    summary
})

export const getTeamGlobalPointSummaryError = () => ({
    type: types.GET_TEAM_GLOBAL_POINT_SUMMARY_ERROR
})
