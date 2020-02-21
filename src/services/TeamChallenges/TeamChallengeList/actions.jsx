import * as types from './actionTypes'

export const getTeamChallengeListByCollaborator = (collaboratorId, current, year, start, end) => {
    return {
        type: types.GET_TEAM_CHALLENGE_LIST_BY_COLLABORATOR,
        collaboratorId,
        current,
        year,
        start,
        end
    }
};

export const getTeamChallengeListByTeam = (teamId, current, year, start, end) => {
    return {
        type: types.GET_TEAM_CHALLENGE_LIST_BY_TEAM,
        teamId,
        current,
        year,
        start,
        end
    }
};

export const getTeamChallengeListSuccess = (challenges) => {
    return {
        type: types.GET_TEAM_CHALLENGE_LIST_SUCCESS,
        challenges
    }
};

export const getTeamChallengeListError = () => {
    return {
        type: types.GET_TEAM_CHALLENGE_LIST_ERROR
    }
};