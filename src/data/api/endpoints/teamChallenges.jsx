import instance from '../instance'

const baseUrl = 'team-challenges/';

const teamChallenges = {
    detail(id) {
        const url = `${baseUrl}${id}/`;
        return instance.get(url)
    },
    goals(id) {
        const url = `${baseUrl}${id}/goals/`;
        return instance.get(url)
    },
    maxPoints(id) {
        const url = `${baseUrl}${id}/max-points/`;
        return instance.get(url)
    },
    participants(id) {
        const url = `${baseUrl}${id}/participants/`;
        return instance.get(url)
    },
    rank(id) {
        const url = `${baseUrl}${id}/rank/`;
        return instance.get(url)
    },
    ranks(id) {
        const url = `${baseUrl}${id}/ranks/`;
        return instance.get(url)
    }
};

export default teamChallenges