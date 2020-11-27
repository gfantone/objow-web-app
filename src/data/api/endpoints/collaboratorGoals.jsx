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
    changeAdvices(id, advices) {
        const url = `${baseUrl}${id}/change-advices/`;
        return instance.post(url, advices)
    },
    duplicate(source, destination) {
        const url = `${baseUrl}duplicate/`
        return instance.post(url, {source, destination})
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
