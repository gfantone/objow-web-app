import * as types from './actionTypes'

export const getTeamChallengeListByCollaborator = (collaboratorId, time, year, start, end, type) => {
    return {
        type: types.GET_TEAM_CHALLENGE_LIST_BY_COLLABORATOR,
        collaboratorId,
        time,
        year,
        start,
        end,
        challengeType: type
    }
};

export const getTeamChallengeListByTeam = (teamId, time, year, start, end, type) => {
    return {
        type: types.GET_TEAM_CHALLENGE_LIST_BY_TEAM,
        teamId,
        time,
        year,
        start,
        end,
        challengeType: type
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
