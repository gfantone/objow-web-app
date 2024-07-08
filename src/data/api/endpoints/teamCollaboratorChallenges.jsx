import instance from '../instance';

const baseUrl = 'team-collaborator-challenges/';

const teamCollaboratorChallenges = {
  detail(id) {
    const url = `${baseUrl}${id}/`;
    return instance.get(url);
  },
  goals(id) {
    const url = `${baseUrl}${id}/goals/`;
    return instance.get(url);
  },
  goalsByTeamGroup(id) {
    const url = `${baseUrl}${id}/goals-by-team-group/`;
    return instance.get(url);
  },
  maxPoints(id) {
    const url = `${baseUrl}${id}/max-points/`;
    return instance.get(url);
  },
  participants(id) {
    const url = `${baseUrl}${id}/participants/`;
    return instance.get(url);
  },
  ranks(id, page, team, teamGroup, search) {
    let url = `${baseUrl}${id}/ranks/`;
    if (page) {
      url = `${url}?page=${page}`;
      if (team) {
        url = `${url}&team=${team}`;
      } else if (teamGroup) {
        url = `${url}&team_group=${teamGroup}`;
      }
    } else {
      if (team) {
        url = `${url}?team=${team}`;
      } else if (teamGroup) {
        url = `${url}?team_group=${teamGroup}`;
      }
    }
    if (search) {
      if (team || page || teamGroup) {
        url = `${url}&search=${search}`;
      } else {
        url = `${url}?search=${search}`;
      }
    }

    return instance.get(url);
  },
  ranksByTeamGroup(id, page, team, teamGroup, search, abortSignal) {
    let url = `${baseUrl}${id}/ranks-by-team-group/`;

    if (page) {
      url = `${url}?page=${page}`;
      if (team) {
        url = `${url}&team=${team}`;
      } else if (teamGroup) {
        url = `${url}&team_group=${teamGroup}`;
      }
    } else {
      if (team) {
        url = `${url}?team=${team}`;
      } else if (teamGroup) {
        url = `${url}?team_group=${teamGroup}`;
      }
    }

    if (search) {
      if (team || page || teamGroup) {
        url = `${url}&search=${search}`;
      } else {
        url = `${url}?search=${search}`;
      }
    }
    return instance.get(url, { signal: abortSignal });
  },
};

export default teamCollaboratorChallenges;
