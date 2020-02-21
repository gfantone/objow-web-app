import * as types from './actionTypes'

export const getCollaboratorChallengeRankListByCollaboratorChallenge = (challengeId) => {
    return {
        type: types.GET_COLLABORATOR_CHALLENGE_RANK_LIST_BY_COLLABORATOR_CHALLENGE,
        challengeId
    }
}

export const getCollaboratorChallengeRankListByTeamCollaboratorChallenge = (challengeId) => {
    return {
        type: types.GET_COLLABORATOR_CHALLENGE_RANK_LIST_BY_TEAM_COLLABORATOR_CHALLENGE,
        challengeId
    }
}

export const getCollaboratorChalengeRankListSuccess = (ranks) => {
    return {
        type: types.GET_COLLABORATOR_CHALLENGE_RANK_LIST_SUCCESS,
        ranks
    }
}

export const getCollaboratorChalengeRankListError = () => {
    return {
        type: types.GET_COLLABORATOR_CHALLENGE_RANK_LIST_ERROR
    }
}