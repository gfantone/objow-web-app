import * as types from './actionTypes'

export const deleteChallenge = (challenge, awards, goals) => {
    return {
        type: types.DELETE_CHALLENGE,
        challenge,
        awards,
        goals
    }
};

export const deleteChallengeSuccess = () => {
    return {
        type: types.DELETE_CHALLENGE_SUCCESS
    }
};

export const deleteChallengeError = () => {
    return {
        type: types.DELETE_CHALLENGE_ERROR
    }
};

export const clearChallengeUpdate = () => {
    return {
        type: types.CLEAR_CHALLENGE_DELETE
    }
};
