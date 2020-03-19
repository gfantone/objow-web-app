import instance from '../instance'

const baseUrl = 'team-goals/';

const teamGoals = {
    advices(id) {
        const url = `${baseUrl}${id}/advices/`;
        return instance.get(url)
    },
    bulkUpdate(goals) {
        const url = `${baseUrl}bulk-update/`;
        return instance.put(url, goals)
    },
    definition(id) {
        const url = `${baseUrl}${id}/definition/`;
        return instance.get(url)
    },
    levels(id) {
        const url = `${baseUrl}${id}/levels/`;
        return instance.get(url)
    },
    ranks(id) {
        const url = `${baseUrl}${id}/ranks/`;
        return instance.get(url)
    }
};

export default teamGoals
