import * as types from './actionTypes'

export const getTeamCollaboratorChallengeDetail = (id) => {
    return {
        type: types.GET_TEAM_COLLABORATOR_CHALLENGE_DETAIL,
        id
    }
};

export const getTeamCollaboratorChallengeDetailSuccess = (challenge) => {
    return {
        type: types.GET_TEAM_COLLABORATOR_CHALLENGE_DETAIL_SUCCESS,
        challenge
    }
};

export const getTeamCollaboratorChallengeDetailError = () => {
    return {
        type: types.GET_TEAM_COLLABORATOR_CHALLENGE_DETAIL_ERROR
    }
};