import * as types from './actionTypes'

export const getCollaboratorChallengeList = (collaboratorId, time, year, start, end) => {
    return {
        type: types.GET_COLLABORATOR_CHALLENGE_LIST,
        collaboratorId,
        year,
        time,
        start,
        end
    }
};

export const getCollaboratorChallengeListSuccess = (challenges) => {
    return {
        type: types.GET_COLLABORATOR_CHALLENGE_LIST_SUCCESS,
        challenges
    }
};

export const getCollaboratorChallengeListError = () => {
    return {
        type: types.GET_COLLABORATOR_CHALLENGE_LIST_ERROR
    }
};
