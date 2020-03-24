import instance from '../instance'

const baseUrl = 'categories/';

const categories = {
    active() {
        const url = `${baseUrl}active/`;
        return instance.get(url)
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
    inactive() {
        const url = `${baseUrl}inactive/`;
        return instance.get(url)
    },
    teamRanks(id, periodId) {
        const url = `${baseUrl}${id}/team-ranks/?year=${periodId}`;
        return instance.get(url)
    },
    update(category) {
        const url = `${baseUrl}${category.id}/`;
        return instance.patch(url, category)
    },
    updateActivation(id, isActive) {
        const url = `${baseUrl}${id}/`;
        return instance.patch(url, {isActive})
    },
    usableIcons(id) {
        const url = `${baseUrl}${id}/usable-icons/`;
        return instance.get(url)
    }
};

export default categories
