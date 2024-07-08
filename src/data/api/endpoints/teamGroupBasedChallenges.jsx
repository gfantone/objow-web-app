import instance from '../instance';

const baseUrl = 'team-group-based-challenges/';

const teamGroupBasedChallenges = {
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
  rank(id) {
    const url = `${baseUrl}${id}/rank/`;
    return instance.get(url);
  },
  ranks(id, page) {
    let url = `${baseUrl}${id}/ranks/`;
    if (page) {
      url = `${url}?page=${page}`;
    }
    return instance.get(url);
  },

  ranksByTeamGroup(id, page) {
    let url = `${baseUrl}${id}/ranks-by-team-group/`;
    if (page) {
      url = `${url}?page=${page}`;
    }
    return instance.get(url);
  },
};

export default teamGroupBasedChallenges;
