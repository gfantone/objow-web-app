import instance from '../instance'
import '../../../helpers/DateHelper'

const baseUrl = 'teams/';

const teams = {
    list() {
        return instance.get(baseUrl)
    },
    detail(id) {
        const url = `${baseUrl}${id}/`;
        return instance.get(url)
    },
    create(team) {
        return instance.post(baseUrl, team)
    },
    update(team) {
        const url = `${baseUrl}${team.id}/`;
        return instance.put(url, team)
    },
    delete(id) {
        const url = `${baseUrl}${id}/`;
        return instance.delete(url)
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
    collaboratorChallenges(id, time, year, start, end) {
        var url = `${baseUrl}${id}/collaborator-challenges/?time=${time}`;
        if (year != null) url = `${url}&year=${year}`;
        if (start != null) url = `${url}&start=${start.toUTCJSON()}`;
        if (end != null) url = `${url}&end=${end.toUTCJSON()}`;
        return instance.get(url)
    },
    collaboratorGoals(id, current, category, year, start, end) {
        var url = `${baseUrl}${id}/collaborator-goals/?current=${current}`;
        if (category != null) url = `${url}&category=${category}`;
        if (year != null) url = `${url}&year=${year}`;
        if (start != null) url = `${url}&start=${start.toUTCJSON()}`;
        if (end != null) url = `${url}&end=${end.toUTCJSON()}`;
        return instance.get(url)
    },
    collaborators(id) {
        const url = `${baseUrl}${id}/collaborators/`;
        return instance.get(url)
    },
    freeColors() {
        const url = `${baseUrl}free-colors/`;
        return instance.get(url)
    },
    generalRank(id, year) {
        var url = `${baseUrl}${id}/general-rank/`;
        if (year != null) url = `${url}?year=${year}`;
        return instance.get(url)
    },
    goals(id, current, category) {
        const ordering = current ? '-timer' : 'timer';
        const currentToString = current ? 'True' : 'False';
        var url = `${baseUrl}${id}/goals/?current=${currentToString}&ordering=${ordering}`;
        if (category != null) url = `${url}&category=${category}`;
        return instance.get(url)
    },
    teamChallenges(id, time, year, start, end) {
        var url = `${baseUrl}${id}/team-challenges/?time=${time}`;
        if (year != null) url = `${url}&year=${year}`;
        if (start != null) url = `${url}&start=${start.toUTCJSON()}`;
        if (end != null) url = `${url}&end=${end.toUTCJSON()}`;
        return instance.get(url)
    },
    teamGoals(id, current, category, year, start, end) {
        var url = `${baseUrl}${id}/team-goals/?current=${current}`;
        if (category != null) url = `${url}&category=${category}`;
        if (year != null) url = `${url}&year=${year}`;
        if (start != null) url = `${url}&start=${start.toUTCJSON()}`;
        if (end != null) url = `${url}&end=${end.toUTCJSON()}`;
        return instance.get(url)
    },
};

export default teams
