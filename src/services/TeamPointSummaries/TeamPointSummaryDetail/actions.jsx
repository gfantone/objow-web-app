import * as types from './actionTypes'

export const getTeamPointSummary = (teamId, periodId) => ({
    type: types.GET_TEAM_POINT_SUMMARY_DETAIL,
    teamId,
    periodId
})

export const getTeamPointSummarySuccess = (summary) => ({
    type: types.GET_TEAM_POINT_SUMMARY_DETAIL_SUCCESS,
    summary
})

export const getTeamPointSummaryError = () => ({
    type: types.GET_TEAM_POINT_SUMMARY_DETAIL_ERROR
})
