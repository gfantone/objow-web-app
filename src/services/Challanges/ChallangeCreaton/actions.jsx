import * as types from './actionTypes'

export const createChallenge = (challenge, awards, goals, teamId) => {
    return {
        type: types.CREATE_CHALLENGE,
        challenge,
        awards,
        goals,
        teamId
    }
};

export const createChallengeSuccess = () => {
    return {
        type: types.CREATE_CHALLENGE_SUCCESS
    }
};

export const createChallengeError = () => {
    return {
        type: types.CREATE_CHALLENGE_ERROR
    }
};

export const clearChallengeCreation = () => {
    return {
        type: types.CLEAR_CHALLENGE_CREATION
    }
};