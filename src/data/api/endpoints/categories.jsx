import instance from '../instance'

const baseUrl = 'categories/';

const categories = {
    list() {
        return instance.get(baseUrl)
    },
    detail(id) {
        const url = `${baseUrl}${id}/`;
        return instance.get(url)
    },
    collaboratorRanks(id, periodId) {
        const url = `${baseUrl}${id}/collaborator-ranks/?year=${periodId}`;
        return instance.get(url)
    },
    create(category) {
        return instance.post(baseUrl, category)
    },
    teamRanks(id, periodId) {
        const url = `${baseUrl}${id}/team-ranks/?year=${periodId}`;
        return instance.get(url)
    }
};

export default categories