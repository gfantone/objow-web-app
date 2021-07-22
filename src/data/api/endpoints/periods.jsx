import instance from '../instance'

const baseUrl = 'periods/';

const periods = {
    list() {
        return instance.get(baseUrl)
    },
    badges(id) {
        const url = `${baseUrl}${id}/badges/`;
        return instance.get(url)
    },
    badgeLevelRemainingPoints(id) {
        const url = `${baseUrl}${id}/badge-level-remaining-points/`;
        return instance.get(url)
    },
    challengeTypes(id) {
        const url = `${baseUrl}${id}/challenge-types/`;
        return instance.get(url)
    },
    challengeTypeSummaries(id) {
        const url = `${baseUrl}${id}/challenge-type-summaries/`;
        return instance.get(url)
    },
    collaboratorChallengeRanking(id) {
        const url = `${baseUrl}${id}/collaborator-challenge-ranking/`;
        return instance.get(url)
    },
    collaboratorGeneralRanking(id) {
        const url = `${baseUrl}${id}/collaborator-general-ranking/`;
        return instance.get(url)
    },
    collaboratorGlobalPointSummary(id) {
        const url = `${baseUrl}${id}/collaborator-global-point-summary/`
        return instance.get(url)
    },
    collaboratorGoalUsedPoints(id) {
        const url = `${baseUrl}${id}/collaborator-goal-used-points/`;
        return instance.get(url)
    },
    configs(id) {
        const url = `${baseUrl}${id}/configs/`;
        return instance.get(url)
    },
    current() {
        const url = `${baseUrl}current/`;
        return instance.get(url)
    },
    goalDefinitions(id, isActive, allDefinitions) {
        let url = `${baseUrl}${id}/goal-definitions/?isActive=${isActive}`;
        if (allDefinitions !== null) url = `${url}&allDefinitions=${allDefinitions}`
        return instance.get(url)
    },
    levels(id) {
        const url = `${baseUrl}${id}/levels/`;
        return instance.get(url)
    },
    next() {
        const url = `${baseUrl}next/`;
        return instance.get(url)
    },
    previous() {
        const url = `${baseUrl}previous/`;
        return instance.get(url)
    },
    teamChallengeRanking(id) {
        const url = `${baseUrl}${id}/team-challenge-ranking/`;
        return instance.get(url)
    },
    teamGeneralRanking(id) {
        const url = `${baseUrl}${id}/team-general-ranking/`;
        return instance.get(url)
    },
    teamGlobalPointSummary(id) {
        const url = `${baseUrl}${id}/team-global-point-summary/`
        return instance.get(url)
    },
    teamGoalUsedPoints(id) {
        const url = `${baseUrl}${id}/team-goal-used-points/`;
        return instance.get(url)
    }
};

export default periods
