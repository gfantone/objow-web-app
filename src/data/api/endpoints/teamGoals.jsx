import instance from '../instance'

const baseUrl = 'team-goals/';

const teamGoals = {
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