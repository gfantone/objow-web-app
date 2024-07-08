import instance from '../instance';

const baseUrl = 'collaborator-challenges/';

const collaboratorChallenges = {
  detail(id) {
    const url = `${baseUrl}${id}/`;
    return instance.get(url);
  },
  goals(id) {
    const url = `${baseUrl}${id}/goals/`;
    return instance.get(url);
  },
  wonAwards(id) {
    const url = `${baseUrl}${id}/won_awards/`;
    return instance.get(url);
  },
  currentRank(id) {
    const url = `${baseUrl}${id}/current_rank/`;
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
  rank(id, page) {
    let url = `${baseUrl}${id}/rank/`;
    if (page) {
      url = `${url}?page=${page}`;
    }
    return instance.get(url);
  },
  ranks(id, page, team, teamGroup, search) {
    let url = `${baseUrl}${id}/ranks/`;
    if (page) {
      url = `${url}?page=${page}`;
      if (team) {
        url = `${url}&team=${team}`;
      } else if (teamGroup) {
        url = `${url}&teamGroup=${teamGroup}`;
      }
    } else {
      if (team) {
        url = `${url}?team=${team}`;
      } else if (teamGroup) {
        url = `${url}?teamGroup=${teamGroup}`;
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
};

export default collaboratorChallenges;
