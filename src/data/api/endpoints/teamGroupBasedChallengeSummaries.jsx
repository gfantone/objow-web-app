import instance from '../instance';

const baseUrl = 'team-group-based-challenge-summaries/';

const teamGroupBasedChallengeSummaries = {
  detail(id) {
    const url = `${baseUrl}${id}/`;
    return instance.get(url);
  },
};

export default teamGroupBasedChallengeSummaries;
