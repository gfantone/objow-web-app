import instance from '../instance'
import '../../../helpers/DateHelper'

const baseUrl = 'challenges/';

const challenges = {
    create(challenge, teamId) {
        var url = `${baseUrl}`;
        if (teamId) url += `?team=${teamId}`;
        return instance.post(url, challenge)
    },
    update(challenge) {
        const url = `${baseUrl}${challenge.id}/`;
        challenge.start = challenge.start.toUTCJSON();
        challenge.end = challenge.end.toUTCJSON();
        return instance.put(url, challenge)
    },
    delete(challenge) {
        const url = `${baseUrl}${challenge.sourceId}/`;
        return instance.delete(url)
    },
    usablePoints(id, start = null, end = null) {
        var url = `${baseUrl}${id}/usable-points/`;
        if (start && end) url += `?start=${start.toUTCJSON()}&end=${end.toUTCJSON()}`;
        return instance.get(url)
    },
    detail(id) {
        const url = `${baseUrl}${id}/`;
        return instance.get(url)
    },
    awards(id) {
        const url = `${baseUrl}${id}/awards/`;
        return instance.get(url)
    },
    changeAwards(id, awards) {
        const url = `${baseUrl}${id}/change-awards/`;
        return instance.post(url, awards)
    },
    goals(id) {
        const url = `${baseUrl}${id}/goals/`;
        return instance.get(url)
    },
    changeGoals(id, goals) {
        const url = `${baseUrl}${id}/change-goals/`;
        return instance.post(url, goals)
    }
};

export default challenges
