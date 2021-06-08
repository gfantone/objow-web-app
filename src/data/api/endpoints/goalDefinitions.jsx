import instance from '../instance'

const baseUrl = 'goal-definitions/';

const goalDefinitions = {
    current() {
        const url = `${baseUrl}current/`;
        return instance.get(url)
    },
    detail(id) {
        const url = `${baseUrl}${id}/`;
        return instance.get(url)
    },
    collaboratorGoals(id, date, team) {
        const url = `${baseUrl}${id}/collaborator-goals/?team=${team}&date=${date.toISOString()}`;
        return instance.get(url)
    },
    create(definition) {
        return instance.post(baseUrl, definition)
    },
    update(id, definition) {
        const url = `${baseUrl}${id}/`;
        return instance.put(url, definition)
    },
    updateActivation(id, isActive) {
        const url = `${baseUrl}${id}/`;
        return instance.patch(url, {isActive})
    },
    goals(id, date) {
        var url = `${baseUrl}${id}/goals/`;
        if (date) url += `?date=${date.toISOString()}`;
        return instance.get(url)
    },
    levelCount(id) {
        const url = `${baseUrl}${id}/level-count/`;
        return instance.get(url)
    },
    levels(id) {
        const url = `${baseUrl}${id}/levels/`;
        return instance.get(url)
    },
    list() {
        return instance.get(baseUrl)
    },
    points(id) {
        const url = `${baseUrl}${id}/points/`;
        return instance.get(url)
    },
    obtainedPoints(id) {
        const url = `${baseUrl}${id}/obtained-points/`;
        return instance.get(url)
    },
    teamCollaboratorGoals(id, date, team = null) {
        console.log('teamCollaboratorGoals api', date);
        var url = `${baseUrl}${id}/team-collaborator-goals/?date=${date.toISOString()}`;
        if (team != null) {
            url += `&team=${team}`
        }
        return instance.get(url)
    },
    teamGoals(id, date) {
        const url = `${baseUrl}${id}/team-goals/?date=${date.toISOString()}`;
        return instance.get(url)
    }
};

export default goalDefinitions
