import instance from '../instance'
import '../../../helpers/DateHelper'

const baseUrl = 'collaborators/';

const collaborators = {
    list() {
        const url = `${baseUrl}`;
        return instance.get(url)
    },
    definitions(id, periodId, current, detail) {
        let url = `${baseUrl}${id}/definitions/?period=${periodId}`
        if(current !== undefined && current !== null) url = `${url}&current=${current}`
        if(detail !== undefined && detail !== null) url = `${url}&detail=${detail}`
        return instance.get(url)
    },
    detail(id) {
        const url = `${baseUrl}${id}/`;
        return instance.get(url)
    },
    badges(id, year) {
        var url = `${baseUrl}${id}/badges/`;
        if (year != null) url = `${url}?year=${year}`;
        return instance.get(url)
    },
    badgeSummaries(id, year) {
        var url = `${baseUrl}${id}/badge-summaries/`;
        if (year != null) url = `${url}?year=${year}`;
        return instance.get(url)
    },
    categoryRanks(id, year) {
        var url = `${baseUrl}${id}/category-ranks/`;
        if (year != null) url = `${url}?year=${year}`;
        return instance.get(url)
    },
    challengeRank(id, year) {
        var url = `${baseUrl}${id}/challenge-rank/`;
        if (year != null) url = `${url}?year=${year}`;
        return instance.get(url)
    },
    coachingItems(id) {
        const url = `${baseUrl}${id}/coaching-items/`;
        return instance.get(url)
    },
    collaboratorChallenges(id, time, year, start, end, type) {
        var url = `${baseUrl}${id}/collaborator-challenges/?time=${time}`;
        if (year != null) url = `${url}&year=${year}`;
        if (start != null) url = `${url}&start=${start.toUTCJSON()}`;
        if (end != null) url = `${url}&end=${end.toUTCJSON()}`;
        if (type != null) url = `${url}&type=${type}`;
        return instance.get(url)
    },
    collaboratorGoals(id, current, category, year, start, end, name, definition) {
        var url = `${baseUrl}${id}/collaborator-goals/?current=${current}`;
        if (category != null) url = `${url}&category=${category}`;
        if (year != null) url = `${url}&year=${year}`;
        if (start != null) url = `${url}&start=${start.toUTCJSON()}`;
        if (end != null) url = `${url}&end=${end.toUTCJSON()}`;
        if (definition != null) url = `${url}&definition=${definition}`;
        if (name != null && name !== '') url = `${url}&name=${name}`;
        return instance.get(url)
    },
    collaboratorGoalStats(definitionId, collaboratorId) {
        const url = `${baseUrl}${collaboratorId}/collaborator-goal-stats/?definition=${definitionId}`
        return instance.get(url)
    },
    collaboratorPointSummary(id, periodId) {
        var url = `${baseUrl}${id}/collaborator-point-summary/`
        if (periodId != null) url = `${url}?period=${periodId}`
        return instance.get(url)
    },
    count() {
        const url = `${baseUrl}count/`;
        return instance.get(url)
    },
    free() {
        const url = `${baseUrl}free/`;
        return instance.get(url)
    },
    generalRank(id, year) {
        var url = `${baseUrl}${id}/general-rank/`;
        if (year != null) url = `${url}?year=${year}`;
        return instance.get(url)
    },
    goalCategories(id, year) {
        var url = `${baseUrl}${id}/goal-categories/`;
        if (year != null) url = `${url}?year=${year}`;
        return instance.get(url)
    },
    nextBagdes(id, year) {
        var url = `${baseUrl}${id}/next-badges/`;
        if (year != null) url = `${url}?year=${year}`;
        return instance.get(url)
    },
    nextLevel(id, year) {
        var url = `${baseUrl}${id}/next-level/`;
        if (year != null) url = `${url}?year=${year}`;
        return instance.get(url)
    },
    teamCategoryRanks(id) {
        const url = `${baseUrl}${id}/team-category-ranks/`;
        return instance.get(url)
    },
    teamChallenges(id, time, year, start, end, type) {
        var url = `${baseUrl}${id}/team-challenges/?time=${time}`;
        if (year != null) url = `${url}&year=${year}`;
        if (start != null) url = `${url}&start=${start.toUTCJSON()}`;
        if (end != null) url = `${url}&end=${end.toUTCJSON()}`;
        if (type != null) url = `${url}&type=${type}`;
        return instance.get(url)
    },
    teamGoals(id, current, category, year, start, end, name, definition) {
        var url = `${baseUrl}${id}/team-goals/?current=${current}`;
        if (category != null) url = `${url}&category=${category}`;
        if (year != null) url = `${url}&year=${year}`;
        if (start != null) url = `${url}&start=${start.toUTCJSON()}`;
        if (end != null) url = `${url}&end=${end.toUTCJSON()}`;
        if (definition != null) url = `${url}&definition=${definition}`;
        if (name != null && name !== '') url = `${url}&name=${name}`;
        return instance.get(url)
    },
    teamGoalStats(definitionId, collaboratorId) {
        const url = `${baseUrl}${collaboratorId}/team-goal-stats/?definition=${definitionId}`
        return instance.get(url)
    },
    teamPointSummary(id, periodId) {
        var url = `${baseUrl}${id}/team-point-summary/`
        if (periodId != null) url = `${url}?period=${periodId}`
        return instance.get(url)
    }
};

export default collaborators
