import axios from 'axios'
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
    collaboratorGoalsBulk(id, dates, teams) {
        let urls = []
        teams.forEach((team) => {
          dates.forEach((date) => {
            urls = [...urls, `${baseUrl}${id}/collaborator-goals/?team=${team.id}&date=${date.toISOString()}`];
          });

        });

        return axios.all(urls.map(url => instance.get(url)))
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
    levelCount(id, team, collaborator) {
        let url = `${baseUrl}${id}/level-count`;
        if(team) {

          url = `${url}?team=${team}`
        } else if (collaborator) {

          url = `${url}?collaborator=${collaborator}`
        }
        return instance.get(url)
    },
    levels(id, teamId, collaboratorId) {
        let url = `${baseUrl}${id}/levels/`;
        if (collaboratorId) {

          url = `${url}?collaborator=${collaboratorId}`
        } else if(teamId) {
          url = `${url}?team=${teamId}`
        }
        return instance.get(url)
    },
    list() {
        return instance.get(baseUrl)
    },
    points(id, team, collaborator) {
        let url = `${baseUrl}${id}/points`;

        if(team) {
          url = `${url}?team=${team}`
        } else if (collaborator) {
          url = `${url}?collaborator=${collaborator}`
        }
        return instance.get(url)
    },
    obtainedPoints(id, team, collaborator) {
        let url = `${baseUrl}${id}/obtained-points`;
        if(team) {
          url = `${url}?team=${team}`
        } else if (collaborator) {
          url = `${url}?collaborator=${collaborator}`
        }
        return instance.get(url)
    },
    usedPoints(id, team, collaborator) {
        let url = `${baseUrl}${id}/used-points`;
        if(team) {
          url = `${url}?team=${team}`
        } else if (collaborator) {
          url = `${url}?collaborator=${collaborator}`
        }
        return instance.get(url)
    },
    currentPoints(id, team, collaborator) {
        let url = `${baseUrl}${id}/current-points`;
        if(team) {
          url = `${url}?team=${team}`
        } else if (collaborator) {
          url = `${url}?collaborator=${collaborator}`
        }
        return instance.get(url)
    },
    teamCollaboratorGoals(id, date, team = null) {
        var url = `${baseUrl}${id}/team-collaborator-goals/?date=${date.toISOString()}`;
        if (team != null) {
            url += `&team=${team}`
        }
        return instance.get(url)
    },
    teamCollaboratorGoalsBulk(id, dates, team = null) {
        let urls = []
        const teamOption = team != null ? `&team=${team}` : ''

        dates.forEach((date) => {
          urls = [...urls, `${baseUrl}${id}/team-collaborator-goals/?date=${date.toISOString()}${teamOption}`];
        });
        return axios.all(urls.map(url => instance.get(url)))
    },
    teamGoals(id, date) {
        const url = `${baseUrl}${id}/team-goals/?date=${date.toISOString()}`;
        return instance.get(url)
    },
    teamGoalsBulk(id, dates) {
        let urls = []

        dates.forEach((date) => {
          urls = [...urls, `${baseUrl}${id}/team-goals/?date=${date.toISOString()}`];
        });
        return axios.all(urls.map(url => instance.get(url)))
    }
};

export default goalDefinitions
