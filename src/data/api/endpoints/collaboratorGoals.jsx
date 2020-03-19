import instance from '../instance'

const baseUrl = 'collaborator-goals/';

const collaboratorGoals = {
    advices(id) {
        const url = `${baseUrl}${id}/advices/`;
        return instance.get(url)
    },
    bulkUpdate(goals) {
        const url = `${baseUrl}bulk-update/`;
        return instance.put(url, goals)
    },
    levels(id) {
        const url = `${baseUrl}${id}/levels/`;
        return instance.get(url)
    },
    definition(id) {
        const url = `${baseUrl}${id}/definition/`;
        return instance.get(url)
    },
    ranks(id) {
        const url = `${baseUrl}${id}/ranks/`;
        return instance.get(url)
    }
};

export default collaboratorGoals
