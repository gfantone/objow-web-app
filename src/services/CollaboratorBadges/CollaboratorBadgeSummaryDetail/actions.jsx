import * as types from './actionTypes'

export const getCollaboratorBadgeSummary = (id) => ({
    type: types.GET_COLLABORATOR_BADGE_SUMMARY,
    id
})

export const getCollaboratorBadgeSummarySuccess = (summary) => ({
    type: types.GET_COLLABORATOR_BADGE_SUMMARY_SUCCESS,
    summary
})

export const getCollaboratorBadgeSummaryError = () => ({
    type: types.GET_COLLABORATOR_BADGE_SUMMARY_ERROR
})
